import { PrismaClient, Product } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const requiredData = ['title', 'description', 'price'];
  const missingData = requiredData.filter((field) => !body[field]);
  if (missingData.length) {
    return {
      status: 400,
      body: {
        message: `Missing required fields: ${missingData.join(', ')}`,
      },
    };
  }
  let result: Product;
  try {
    result = await prisma.product.create({ data: body });
  } catch (error) {
    return {
      status: 400,
      body: {
        message: `Unable to create product: ${error || 'Unknown error'}`,
      },
    };
  }
  return result;
});
