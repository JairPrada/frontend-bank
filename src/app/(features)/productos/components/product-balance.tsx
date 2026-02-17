interface ProductBalanceProps {
  balance?: string;
  limit?: string;
  rate?: string;
}

export function ProductBalance({ balance, limit, rate }: ProductBalanceProps) {
  return (
    <div className="flex flex-col items-end gap-1 shrink-0">
      {balance && (
        <p className="text-xl md:text-2xl font-bold text-gray-900">{balance}</p>
      )}
      {limit && <p className="text-sm text-gray-500">Cupo: {limit}</p>}
      {rate && (
        <p className="text-sm text-emerald-600 font-medium">Tasa: {rate}</p>
      )}
    </div>
  );
}
