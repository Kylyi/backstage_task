import { PrismaClient } from "@prisma/client";
import { Product } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const newProduct = body as Product;
  const result = await prisma.product.create({ data: newProduct });
  return result;
});
