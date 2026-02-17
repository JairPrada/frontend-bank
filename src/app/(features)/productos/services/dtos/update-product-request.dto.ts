export interface UpdateProductRequestDto {
  name?: string;
  description?: string;
  status?: "active" | "pending";
}
