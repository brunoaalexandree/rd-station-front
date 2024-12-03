"use client";

import { useNavigate } from "react-router-dom";
import { Logo } from "../../../../../components/Logo";
import { Button } from "../../../../../components/ui/button";
import { Home } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import getProducts from "../../../../../services/product.service";

export function ProductsPage() {
  const navigate = useNavigate();

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  if (isLoading) {
    return (
      <main className="w-full">
        <header className="w-full bg-slate-200 py-7 flex justify-center">
          <Logo />
        </header>

        <div className="w-full mt-10 flex flex-col items-center">
          <h1 className="font-bold text-2xl">Produtos</h1>
          <span className="w-36 h-1 bg-slate-400/35 rounded-xl mt-2" />

          <div className="w-full max-w-[960px] grid grid-cols-2 gap-10 mt-20">
            <div className="w-full rounded-xl border-2 border-slate-400 p-4">
              <p className="text-xl">Carregando recomendações...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="w-full">
        <header className="w-full bg-slate-200 py-7 flex justify-center">
          <Logo />
        </header>

        <div className="w-full mt-10 flex flex-col items-center">
          <h1 className="font-bold text-2xl">Produtos</h1>
          <span className="w-36 h-1 bg-slate-400/35 rounded-xl mt-2" />

          <div className="w-full max-w-[960px] grid grid-cols-2 gap-10 mt-20">
            <div className="w-full rounded-xl border-2 border-red-500 p-4">
              <p className="text-xl text-red-500">
                Erro ao carregar produtos: {error.message}
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full">
      <header className="w-full bg-slate-200 py-7 flex justify-center">
        <Logo />
      </header>

      <div className="w-full mt-10 flex flex-col items-center">
        <h1 className="font-bold text-2xl">Produtos</h1>
        <span className="w-36 h-1 bg-slate-400/35 rounded-xl mt-2" />

        <div className="w-full max-w-[960px] grid grid-cols-2 gap-10 mt-20">
          {products?.map((product) => (
            <div
              key={product.id}
              className="w-full rounded-xl border-2 border-slate-400 p-4 flex flex-col gap-2"
            >
              <h2 className="font-semibold text-xl">{product.name}</h2>
              <p className="text-gray-600">Categoria: {product.category}</p>
            </div>
          ))}
        </div>
        <Button
          onClick={() => navigate("/products/recommendation/1")}
          className="mt-10 flex items-center space-x-2"
        >
          <span>Descobrir Produtos</span> <Home size={24} color="#fff" />
        </Button>
      </div>
    </main>
  );
}
