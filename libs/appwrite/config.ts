export const config = {
  endpoint: process.env.EXPO_PUBLIC_END_POINT as string,
  platform: process.env.EXPO_PUBLIC_PLATFORM as string,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID as string,
  databaseId: process.env.EXPO_PUBLIC_DATABASE_ID as string,
  imageStorageId: process.env.EXPO_PUBLIC_IMAGE_STORAGE_ID as string,
  productCollectionId: process.env.EXPO_PUBLIC_PRODUCT_COLLECTION_ID as string,
  toppingCollectionId: process.env.EXPO_PUBLIC_TOPPING_COLLECTION_ID as string,
  likedCollectionId: process.env.EXPO_PUBLIC_LIKED_COLLECTION_ID as string,
  shoppingCollectionId: process.env
    .EXPO_PUBLIC_SHOPPING_COLLECTION_ID as string,
  cartCollectionId: process.env.EXPO_PUBLIC_CART_COLLECTION_ID as string,
};
