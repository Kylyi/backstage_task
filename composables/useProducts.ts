import type {
  CreateProductResult,
  Product,
  ProductForm,
} from "@/types/product";
import { RequestStatus } from "~/types/request-status";

export default function useProducts() {
  const products = useState<Product[]>("products", () => []);
  const loadingStatus = useState<RequestStatus>(
    "loadingStatus",
    () => RequestStatus.IDLE
  );

  const setProducts = async (): Promise<Product[]> => {
    loadingStatus.value = RequestStatus.LOADING;
    const { data } = await useFetch<Product[]>("/api/products");
    products.value = data.value || [];
    loadingStatus.value = RequestStatus.SUCCESS;
    return data.value || [];
  };

  const createProduct = async (
    product: ProductForm
  ): Promise<CreateProductResult> => {
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());
    if (product.image?.length) {
      formData.append("image", product.image[0]);
    }

    const { data, error } = await useFetch<Product[]>(
      "http://localhost:3000/api/products",
      {
        method: "POST",
        body: formData,
      }
    );
    if (error.value) {
      throw new Error(error.value.message);
    }
    if (data.value?.length) {
      products.value = data.value || [];
    }
    return { products: data.value || [] };
  };

  return {
    products,
    setProducts,
    createProduct,
    loadingStatus,
  };
}
