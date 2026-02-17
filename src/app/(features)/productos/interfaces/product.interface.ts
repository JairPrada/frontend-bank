export interface UserProduct {
  [x: string]: any;
  id: string;
  name: string;
  type: ProductType;
  description: string;
  imageSrc: string;
  accountNumber?: string;
  balance?: string;
  limit?: string;
  rate?: string;
  status: ProductStatus;
  lastMovement?: string;
}

export type ProductType = "savings" | "credit" | "loan";
export type ProductStatus = "active" | "pending";
export type ProductTabType = "all" | ProductType;
