import { PrismaClient } from '@prisma/client'
import { validate } from "~/lib/validation";

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body: ProductDTO = await readBody(event)

  const errors = validate(body)
  if (errors.length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request - Validation failed',
    })
  }

  // Implement your API here
  return prisma.product.create({
    data: {
      title: body.title,
      description: body.description,
      price: +body.price,
      image: body.image
    }
  })
})
