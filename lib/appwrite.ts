import { Client, Account, Databases } from "react-native-appwrite";

export const client: Client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66ee1535003cb106953a") // Your Project ID
  .setPlatform("com.ronaldo.aora"); // Your package name / bundle identifier

export const account: Account = new Account(client);

export const databases: Databases = new Databases(client);
