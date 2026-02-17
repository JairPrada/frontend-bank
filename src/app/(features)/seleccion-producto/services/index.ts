import { post } from "@/config/axios.instance";
import { CreateProductRequestDto } from "./dtos/create-product-request.dto";
import ENDPOINTS from "@/config/endpoints";

export async function createProduct(data: CreateProductRequestDto) {
  return post(ENDPOINTS["create-product"], data);
}
