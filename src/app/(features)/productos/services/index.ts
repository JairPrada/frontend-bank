import { get, put, del } from "@/config/axios.instance";
import { UpdateProductRequestDto } from "./dtos/update-product-request.dto";
import {
  ProductResponseDto,
  ProductListResponseDto,
} from "./dtos/product-response.dto";
import ENDPOINTS from "@/config/endpoints";

export async function getProducts() {
  return get<ProductListResponseDto>(ENDPOINTS.products);
}

export async function getProductById(id: string) {
  return get<ProductResponseDto>(`${ENDPOINTS.products}/${id}`);
}

export async function updateProduct(id: string, data: UpdateProductRequestDto) {
  return put<ProductResponseDto>(`${ENDPOINTS.products}/${id}`, data);
}

export async function deleteProduct(id: string) {
  return del<void>(`${ENDPOINTS.products}/${id}`);
}
