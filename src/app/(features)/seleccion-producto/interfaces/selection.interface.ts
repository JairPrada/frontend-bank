export interface Product {
  id: string;
  imageSrc: string;
  title: string;
  description: string;
  bgSrc: string;
}

export interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: (productId: string) => void;
}
