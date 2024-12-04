import { Product } from "@/constants/product.type";
import {
  serializeDocumentsToProducts,
  serializeDocumentToShoppingSession,
} from "@/utils/serialize";
import {
  Client,
  Databases,
  ExecutionMethod,
  Functions,
  ID,
  Models,
  Query,
} from "react-native-appwrite";
import { config } from "./config";
import { AddToBasketPayload, ShoppingSessionPayload } from "./payload.type";
import { CartItem, ShoppingSession } from "@/constants/shopping.type";
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const databases = new Databases(client);
const funtions = new Functions(client);

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
  return shoppingSessions;
};

export const createPayment = async (userEmail: string, amount: number) => {
  const payload = {
    userEmail,
    amount,
  };
  const res = await funtions.createExecution(
    "67027e4a0010ee644d34",
    JSON.stringify(payload),
    true,
    undefined,
    ExecutionMethod.POST
  );
};
