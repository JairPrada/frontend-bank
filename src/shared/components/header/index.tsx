"use client";

import Link from "next/link";
import { useState } from "react";
import ROUTES from "@/routes";

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

const navItems: NavItem[] = [
  { label: "Features", href: "#", hasDropdown: true },
  { label: "Tarjeta de Credito", href: ROUTES.REQUEST_PRODUCT },
  { label: "Cuenta Ahorros", href: ROUTES.REQUEST_PRODUCT },
  { label: "Credito", href: ROUTES.REQUEST_PRODUCT },
];

const Header = () => {
  const [activeTab, setActiveTab] = useState<"personal" | "business">(
    "personal",
  );

  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link href={ROUTES.HOME} className="flex items-center">
              <span className="text-2xl font-bold text-emerald-900">
                NeoBank
              </span>
            </Link>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab("personal")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeTab === "personal"
                    ? "bg-emerald-100 text-emerald-900"
                    : "text-gray-600 hover:text-emerald-900"
                }`}
              >
                Personal
              </button>
              <button
                onClick={() => setActiveTab("business")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeTab === "business"
                    ? "bg-emerald-100 text-emerald-900"
                    : "text-gray-600 hover:text-emerald-900"
                }`}
              >
                Business
              </button>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-emerald-900 transition-colors"
              >
                {item.label}
                {item.hasDropdown && (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={ROUTES.LOGIN}
              className="px-5 py-2 rounded-full text-sm font-medium text-emerald-900 bg-emerald-50 hover:bg-emerald-100 transition-colors"
            >
              Iniciar Sesion
            </Link>
            <Link
              href={ROUTES.REQUEST_PRODUCT}
              className="px-5 py-2 rounded-full text-sm font-medium text-white bg-emerald-900 hover:bg-emerald-800 transition-colors"
            >
              Solicitar
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
