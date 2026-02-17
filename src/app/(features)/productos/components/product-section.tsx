import { ProductCard } from "./product-card";
import { PRODUCT_TYPE_CONFIG } from "../constants";
import type { ProductType, UserProduct } from "../interfaces";

interface ProductSectionProps {
  type: ProductType;
  products: UserProduct[];
  editingId: string | null;
  editName: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onEditNameChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onEdit: (product: UserProduct) => void;
  onSave: () => void;
  onCancelEdit: () => void;
  onDelete: (product: UserProduct) => void;
}

export function ProductSection({
  type,
  products,
  editingId,
  editName,
  inputRef,
  onEditNameChange,
  onKeyDown,
  onEdit,
  onSave,
  onCancelEdit,
  onDelete,
}: ProductSectionProps) {
  const config = PRODUCT_TYPE_CONFIG[type];

  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{config.icon}</span>
        <h2 className="text-xl font-bold text-gray-900">{config.title}</h2>
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.badge}`}>
          {products.length}
        </span>
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            type={type}
            config={config}
            isEditing={editingId === product.id}
            editName={editName}
            inputRef={inputRef}
            onEditNameChange={onEditNameChange}
            onKeyDown={onKeyDown}
            onEdit={() => onEdit(product)}
            onSave={onSave}
            onCancelEdit={onCancelEdit}
            onDelete={() => onDelete(product)}
          />
        ))}
      </div>
    </section>
  );
}
