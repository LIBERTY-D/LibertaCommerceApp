const { writeFileSync } = require("fs");

const targetPath = "./src/environments/environment.prod.ts";

const envConfigFile = `export const environment = {
  BASE_URL: '${process.env.BASE_URL || ""}',
  USER_URL: '${process.env.USER_URL || ""}',
  CATEGORY_URL: '${process.env.CATEGORY_URL || ""}',
  ADDRESS_URL: '${process.env.ADDRESS_URL || ""}',
  PRODUCTS_URL: '${process.env.PRODUCTS_URL || ""}',
  ORDERS_URL: '${process.env.ORDERS_URL || ""}',
  FILE_URL: '${process.env.FILE_URL || ""}',
  CONTACT_URL: '${process.env.CONTACT_URL || ""}',
  CART_KEY: '${process.env.CART_KEY || ""}',
  LIBERTA_AUTH_KEY: '${process.env.LIBERTA_AUTH_KEY || ""}'
};
`;

writeFileSync(targetPath, envConfigFile);
console.log(`Environment file generated at ${targetPath}`);
