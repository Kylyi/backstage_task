import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const productId = body as number;
  const result = await prisma.product.delete({ where: { id: productId } });
  return result;
});
