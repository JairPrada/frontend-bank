import { UserProduct } from "../../interfaces";

export interface ProductResponseDto extends UserProduct {}

export type ProductListResponseDto = ProductResponseDto[];
