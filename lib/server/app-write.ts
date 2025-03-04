// import { Account, Client, Databases, Storage } from "appwrite";
import { cookies } from "next/headers";
import {
  Account,
  Client,
  Databases,
  // Models,
  // Query,
  Storage,
} from "node-appwrite";
// import { appRoutes } from "../constants";
// import { redirect } from "next/navigation";

export const appWriteServer = async () => {
  const client = new Client();

  client
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_PROJECT!);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
};

// -------------------------------------------------
export const appWriteCreateAdminServer = async () => {
  const client = new Client();

  client
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_PROJECT!)
    .setKey(process.env.NEXT_PUBLIC_ADMIN_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
};

export const createSessionServer = async () => {
  const client = new Client();

  client
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_PROJECT!);

  // console.log('session at here', session);

  const session = await (await cookies()).get("session");

  if (!session || !session.value) {
    // return null;
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
};

// export const getCurrentUser = async (user: Models.User<Models.Preferences>) => {
//   const { databases } = await createSessionClient();

//   if (user) {

//     "use server"
//     const usersCollection = await databases.listDocuments(
//       process.env.NEXT_PUBLIC_DATABASE!,
//       process.env.NEXT_PUBLIC_USERS_COLLECTION!,
//       [Query.equal("uid", user?.$id)]
//     );

//     if (usersCollection.total === 0) {
//       // redirect(appRoutes.onboarding);
//       return null
//     } else {
//       (await cookies()).set(
//         "user",
//         JSON.stringify({
//           username: usersCollection.documents[0].username,
//           uid: usersCollection.documents[0].uid,
//           email: usersCollection.documents[0].email,
//           isAdmin: usersCollection.documents[0].isAdmin,
//           userType: usersCollection.documents[0].userType,
//           photoUrl: usersCollection.documents[0].photoUrl,
//         })
//       );
//     }

//     // console.log("user", user);
//     // redirect(appRoutes.home);
//   }
// };
