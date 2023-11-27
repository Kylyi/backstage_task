import type { Product } from "@/types/product";

export default function useProducts() {
  const products = useState<Product[]>("products", () => []);

  const setProducts = async () => {
    const { data } = await useFetch<Product[]>("/api/products");
    products.value = data.value || [];
  };

  return {
    products,
    setProducts,
  };
}
