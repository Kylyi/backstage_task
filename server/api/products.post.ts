import { PrismaClient } from "@prisma/client";
import formidable, { File } from "formidable";
import { saveImageToFileSystem } from "../utils/save-image-to-fs";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const form = formidable({});

  const [fields, files] = await form.parse<
    "title" | "description" | "price",
    "image"
  >(event.req);
  const title = fields.title?.length ? fields.title[0] : "";
  const description = fields.description?.length ? fields.description[0] : "";
  const price = fields.price?.length ? +fields.price[0] : 0;

  let image = "https://placehold.co/600x400/png";
  if (files.image?.length) {
    image = await saveImageToFileSystem(files.image[0] as File);
  }

  if (title && description && price) {
    const product = await prisma.product.create({
      data: {
        title,
        description,
        price,
        image,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return product;
  } else {
    throw new Error("Invalid product data");
  }
});
