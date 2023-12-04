export type Product = ProductForm & {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductForm = {
  title: string;
  description: string;
  price: string;
  image: FileList | null;
};

export type CreateProductResult = {
  products: Product[];
};
