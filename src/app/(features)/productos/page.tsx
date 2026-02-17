"use client";

import { useState, useEffect } from "react";
import { PageBackground } from "@/shared/components/page-background";
import Loader from "@/shared/components/loader";
import { ProductsHeader, ProductTabs, ProductSection, CancelProductModal } from "./components";
import { useProducts } from "./hooks";
import type { ProductTabType } from "./interfaces";

export default function ProductListPage() {
  const [activeTab, setActiveTab] = useState<ProductTabType>("all");
  const [currentTime, setCurrentTime] = useState("");

  const {
    products,
    productsByType,
    getFilteredTypes,
    editingId,
    editName,
    setEditName,
    inputRef,
    handleEdit,
    handleSave,
    handleCancelEdit,
    handleKeyDown,
    cancelingProduct,
    handleCancelProduct,
    confirmCancelProduct,
    closeCancelModal,
    isLoading,
    error,
  } = useProducts();

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("es-CO", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredTypes = getFilteredTypes(activeTab);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <PageBackground variant="light" />
        <Loader fullScreen size="lg" variant="spinner" text="Cargando productos..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <PageBackground variant="light" />
        <div className="relative z-10 text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error al cargar productos</h2>
          <p className="text-gray-500">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <PageBackground variant="light" />
      <div className="relative z-10">
        <ProductsHeader 
          currentTime={currentTime} 
          totalProducts={products.length} 
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductTabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />

          <div className="space-y-8">
            {filteredTypes.map((type) => (
              <ProductSection
                key={type}
                type={type}
                products={productsByType[type]}
                editingId={editingId}
                editName={editName}
                inputRef={inputRef}
                onEditNameChange={setEditName}
                onKeyDown={handleKeyDown}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancelEdit={handleCancelEdit}
                onDelete={handleCancelProduct}
              />
            ))}
          </div>
        </div>
      </div>

      <CancelProductModal
        product={cancelingProduct}
        onClose={closeCancelModal}
        onConfirm={confirmCancelProduct}
      />
    </main>
  );
}
