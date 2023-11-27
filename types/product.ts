export type Product = {
  id?: number;
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductForm = {
  title: string;
  description: string;
  price: string;
  image: FileList | null;
};
