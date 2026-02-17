import { ProductIcon } from "./product-icon";
import { ProductNameEditor } from "./product-name-editor";
import { ProductNameDisplay } from "./product-name-display";
import { ProductDetails } from "./product-details";
import { ProductBalance } from "./product-balance";
import type { ProductType, UserProduct } from "../interfaces";

interface ProductCardProps {
  product: UserProduct;
  type: ProductType;
  config: {
    gradient: string;
    shadow: string;
  };
  isEditing: boolean;
  editName: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onEditNameChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancelEdit: () => void;
  onDelete: () => void;
}

export function ProductCard({
  product,
  type,
  config,
  isEditing,
  editName,
  inputRef,
  onEditNameChange,
  onKeyDown,
  onEdit,
  onSave,
  onCancelEdit,
  onDelete,
}: ProductCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-lg ${config.shadow} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <ProductIcon
          imageSrc={product.imageSrc}
          name={product.name}
          gradient={config.gradient}
        />

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            {isEditing ? (
              <ProductNameEditor
                value={editName}
                inputRef={inputRef}
                onChange={onEditNameChange}
                onKeyDown={onKeyDown}
                onSave={onSave}
                onCancel={onCancelEdit}
              />
            ) : (
              <ProductNameDisplay
                name={product.name}
                status={product.status}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            )}
          </div>
          <ProductDetails
            description={product.description}
            accountNumber={product.accountNumber}
            lastMovement={product.lastMovement}
            type={type}
          />
        </div>

        <ProductBalance
          balance={product.balance}
          limit={product.limit}
          rate={product.rate}
        />
      </div>
    </div>
  );
}
