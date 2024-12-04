import { Order } from "@/constants/order.type";
import { Product } from "@/constants/product.type";
import { CartItem, ShoppingSession } from "@/constants/shopping.type";
import {
  serializeDocumentsToOrders,
  serializeDocumentsToProducts,
  serializeDocumentToShoppingSession,
} from "@/utils/serialize";
import {
  Client,
  Databases,
  ID,
  Models,
  Query
} from "react-native-appwrite";
import { config } from "./config";
import { AddToBasketPayload, ShoppingSessionPayload } from "./payload.type";
import { UserProfile } from "@/constants/user.type";

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const databases = new Databases(client);

// Collection IDs
const ORDERS_COLLECTION_ID = "670344e10032b4891987";
const USERS_COLLECTION_ID = "66dd34af001b8aede39f";

export const getSpecialOffers = async (limit?: number) => {
  const res = await databases.listDocuments(
    config.databaseId,
    config.productCollectionId,
    limit ? [Query.limit(limit)] : []
  );
  const products = serializeDocumentsToProducts(res.documents);
  return products;
};

export const getProductsByCategoryId = async (categoryId?: string) => {
  const res = await databases.listDocuments(
    config.databaseId,
    config.productCollectionId,
    categoryId ? [Query.equal("category_id", categoryId)] : []
  );

  const products = serializeDocumentsToProducts(res.documents);
  return products;
};

export const getProductById = async (id: string) => {
  const res = await databases.getDocument(
    config.databaseId,
    config.productCollectionId,
    id
  );
  const products = serializeDocumentsToProducts([res]);
  return products[0];
};

export const getAllLikedProducts = async (
  email: string
): Promise<{
  id: string;
  products: Product[];
}> => {
  const res = await databases.listDocuments(
    config.databaseId,
    config.likedCollectionId,
    [Query.equal("user_email", email)]
  );
  const products = serializeDocumentsToProducts(
    res.documents[0].liked_products
  );
  return {
    id: res.documents[0].$id,
    products,
  };
};

export const updateLikedProducts = async (
  id: string,
  liked_products: string[]
) => {
  try {
    await databases.updateDocument(
      config.databaseId,
      config.likedCollectionId,
      id,
      {
        liked_products,
      },
      [`update("any")`]
    );
  } catch (e) {
    console.error(e);
  }
};

export const addProductToBasket = async (
  user_email: string,
  payload: AddToBasketPayload,
  currentShoppingSession: ShoppingSession | undefined
) => {
  const total =
    payload.quantity * payload.price +
    payload.toppings.reduce(
      (acc, _, currIndex) => acc + payload.toppings_price[currIndex],
      0
    );
  const shoppingSessionPayload: ShoppingSessionPayload = {
    user_email,
    total,
  };
  try {
    let res: Models.Document;

    if (currentShoppingSession) {
      res = await databases.updateDocument(
        config.databaseId,
        config.shoppingCollectionId,
        currentShoppingSession.id,
        {
          total: currentShoppingSession.total + total,
        },
        [`update("any")`]
      );
    } else {
      res = await databases.createDocument(
        config.databaseId,
        config.shoppingCollectionId,
        ID.unique(),
        shoppingSessionPayload
      );
    }

    const existProduct = res.cartItems.find(
      (item: CartItem) => item.product_id === payload.product_id
    );
    const cartPayload = {
      ...payload,
      session_id: res.$id,
    };

    if (existProduct) {
      cartPayload.quantity += existProduct.quantity;

      await databases.updateDocument(
        config.databaseId,
        config.cartCollectionId,
        existProduct.$id,
        cartPayload,
        [`update("any")`]
      );
    } else {
      await databases.createDocument(
        config.databaseId,
        config.cartCollectionId,
        ID.unique(),
        cartPayload
      );
    }
  } catch (e) {
    console.log("e", e);
  }
};

export const getShoppingCart = async (user_email: string) => {
  const res = await databases.listDocuments(
    config.databaseId,
    config.shoppingCollectionId,
    [Query.equal("user_email", user_email)]
  );
  const shoppingSessions = serializeDocumentToShoppingSession(res.documents);
  return shoppingSessions || [];
};

export const createOrder = async (
  user_email: string,
  sub_total: number,
  discounted: number
) => {
  const payload = {
    user_email,
    sub_total,
    discounted,
  };
  try {
    const res = await databases.createDocument(
      config.databaseId,
      config.orderCollectionId,
      ID.unique(),
      payload
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const createPayment = async (
  discounted: number,
  shoppingSession: ShoppingSession
) => {
  const sub_total = shoppingSession.cartItems.reduce((pre, cur) => {
    return pre + cur.price * cur.quantity;
  }, 0);

  const orderData = await createOrder(
    shoppingSession.user_email,
    sub_total,
    discounted
  );

  const promises = shoppingSession.cartItems.map((item) => {
    return databases.createDocument(
      config.databaseId,
      "671489fc00319ad24551",
      ID.unique(),
      {
        product_name: item.product_name,
        quantity: item.quantity,
        price: item.price,
        order_id: orderData?.$id,
        product_image: item.product_image,
      }
    );
  });

  await Promise.all(promises);

  if (!orderData) return;

  const payload = {
    orderId: orderData.$id,
    userId: "66dd3e88002202307b26",
    userEmail: shoppingSession.user_email,
    shoppingSessionId: shoppingSession.id,
    amount: sub_total,
  };
  try {
    const execution = await fetch(
      "https://67027e4b211ccc434df1.appwrite.global/checkout",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await execution.json();
    const updateTotalSalesPromises = shoppingSession.cartItems.map(async (item) => {
      const product = await databases.getDocument(
        config.databaseId,
        config.productCollectionId,
        item.product_id
      );
      await databases.updateDocument(
        config.databaseId,
        config.productCollectionId,
        item.product_id,
        {
          total_sales: product.total_sales + item.quantity,
        }
      );
    });

    await Promise.all(updateTotalSalesPromises);
    return res;
  } catch (e) {
    console.log("e", e);
  }
  return null;
};

export const getOrders = async (email: string) => {
  try {
    const response = await databases.listDocuments(
      config.databaseId,
      ORDERS_COLLECTION_ID,
      [
        Query.equal("user_email", email),
        Query.orderDesc("$createdAt"),
      ]
    );
    const orders = serializeDocumentsToOrders(response.documents);
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

export const getOrdersByStatus = async (userId: string, status: string) => {
  try {
    const response = await databases.listDocuments(
      config.databaseId,
      ORDERS_COLLECTION_ID,
      [
        Query.equal("userId", userId),
        Query.equal("status", status),
        Query.orderDesc("$createdAt"),
      ]
    );
    const orders = serializeDocumentsToOrders(response.documents);
    return orders;
  } catch (error) {
    console.error("Error fetching orders by status:", error);
    return [];
  }
};

export const getOrderById = async (id: string) => {
  try {
    const response = await databases.getDocument(
      config.databaseId,
      ORDERS_COLLECTION_ID,
      id
    );
    const orders = serializeDocumentsToOrders([response]);
    return orders[0];
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
};

export const getUserProfile = async (email: string) => {
  try {
    const response = await databases.listDocuments(
      config.databaseId,
      USERS_COLLECTION_ID,
      [Query.equal("email", email)]
    );

    if (response.documents.length > 0) {
      return response.documents[0] as unknown as UserProfile;
    }

    // If no profile exists, create one with email from Clerk
    const newProfile = await databases.createDocument(
      config.databaseId,
      USERS_COLLECTION_ID,
      ID.unique(),
      {
        email,
        phone_number: "",
        delivery_address: "",
      }
    );

    return newProfile as unknown as UserProfile;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

export const updateUserProfile = async (email: string, data: Partial<UserProfile>) => {
  try {
    const response = await databases.listDocuments(
      config.databaseId,
      USERS_COLLECTION_ID,
      [Query.equal("email", email)]
    );

    if (response.documents.length > 0) {
      // Update existing profile
      const profile = response.documents[0];
      await databases.updateDocument(
        config.databaseId,
        USERS_COLLECTION_ID,
        profile.$id,
        data
      );
    } else {
      // Create new profile if doesn't exist
      await databases.createDocument(
        config.databaseId,
        USERS_COLLECTION_ID,
        ID.unique(),
        {
          email,
          ...data
        }
      );
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
