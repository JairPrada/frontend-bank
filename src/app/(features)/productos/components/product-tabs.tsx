import { PRODUCT_TABS } from "../constants";
import type { ProductTabType } from "../interfaces";

interface ProductTabsProps {
  activeTab: ProductTabType;
  onTabChange: (tab: ProductTabType) => void;
}

export function ProductTabs({ activeTab, onTabChange }: ProductTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {PRODUCT_TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeTab === tab.id
              ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
