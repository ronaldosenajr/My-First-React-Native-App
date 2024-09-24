import {
  Client,
  Account,
  Databases,
  ID,
  Avatars,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.ronaldo.aora",
  projectId: "66ee1535003cb106953a",
  databaseId: "66ee175100319d837465",
  userCollectionId: "66ee18700007d242133f",
  videoCollectionId: "66ee190f003619946fa8",
  storageId: "66f2041e00185e098127",
};

const client: Client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId) // Your Project ID
  .setPlatform(config.platform); // Your package name / bundle identifier

const account: Account = new Account(client);
const avatars = new Avatars(client);

const databases: Databases = new Databases(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        username,
        email,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const checkActiveSession = async () => {
  try {
    const session = await account.getSession("current"); // Get the current session
    return session !== null; // Return true if there is an active session
  } catch (error: { code: number } | any) {
    // If there's an error (e.g., no active session), handle it appropriately
    if (error?.code === 401) {
      return false; // No active session
    }
    throw error; // Re-throw other unexpected errors
  }
};

export const deleteSessions = async () => {
  try {
    const sessions = await account.listSessions();
    await Promise.all(
      sessions.sessions.map(async (session) => {
        await account.deleteSession(session.$id);
      })
    );
    console.log("sessions deleted");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};
