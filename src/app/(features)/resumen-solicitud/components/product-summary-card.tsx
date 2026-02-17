import Image from "next/image";
import { CheckCircleFilledIcon } from "@/shared/components/icons";
import { PRODUCT_DETAILS } from "../constants";

interface ProductSummaryCardProps {
  productId: string;
}

export const ProductSummaryCard = ({ productId }: ProductSummaryCardProps) => {
  const product = PRODUCT_DETAILS[productId] || PRODUCT_DETAILS["credit-card"];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg mb-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center">
          <Image
            src={product.icon}
            alt={product.title}
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{product.title}</h3>
          <p className="text-sm text-emerald-600 font-medium">Aprobado</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">{product.description}</p>
      <ul className="space-y-2">
        {product.benefits.map((benefit, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
            <CheckCircleFilledIcon className="w-4 h-4 text-emerald-500 shrink-0" />
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
};
