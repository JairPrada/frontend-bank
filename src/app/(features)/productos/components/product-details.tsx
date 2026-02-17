import type { ProductType } from "../interfaces";

interface ProductDetailsProps {
  description: string;
  accountNumber?: string;
  lastMovement?: string;
  type: ProductType;
}

export function ProductDetails({
  description,
  accountNumber,
  lastMovement,
  type,
}: ProductDetailsProps) {
  const getAccountLabel = () => (type === "savings" ? "Cuenta" : "Tarjeta");
  const showAccountNumber = accountNumber && (type === "savings" || type === "credit");

  return (
    <>
      <p className="text-gray-500 text-sm">{description}</p>
      {showAccountNumber && (
        <p className="text-gray-600 text-sm font-mono mt-1">
          {getAccountLabel()}: {accountNumber}
        </p>
      )}
      {lastMovement && (
        <p className="text-gray-400 text-xs mt-1">
          {type === "loan" ? lastMovement : `Último movimiento: ${lastMovement}`}
        </p>
      )}
    </>
  );
}
