import { Convert } from "easy-currencies";

export const handleConvertCurrency = async ({ price }: { price: number }) => {
  const value = await Convert(price).from("USD").to("GHS");
  return value;
};
