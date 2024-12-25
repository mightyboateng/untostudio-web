// import { Account, Client } from "appwrite";
import { Account, Client, Databases, Storage } from "node-appwrite";

// export const appWriteClient = () => {
//   const client = new Client();

//   client
//     .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
//     .setProject(process.env.NEXT_PUBLIC_PROJECT!);

//   return client;
// };

// export const appWriteAccount = () => {
//   const account = new Account(appWriteClient());

//   return account;
// };

export const appWriteCreateAdminClient = async () => {
  const client = new Client();

  client
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_PROJECT!)
    .setKey(process.env.NEXT_PUBLIC_ADMIN_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
};

export const createSessionClient = async (session: string | undefined) => {
  const client = new Client();

  client
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_PROJECT!);

    console.log('session at here', session);
  if (session) {
    client.setSession(session);
  }

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
