import { Account, Client } from "appwrite";

export const appWriteClient = () => {
  const client = new Client();

  client
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_PROJECT!);

  return client;
};

export const appWriteAccount = () => {
  const account = new Account(appWriteClient());

  return account;
};
