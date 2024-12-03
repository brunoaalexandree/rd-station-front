"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../../../../components/Logo";
import { Button } from "../../../../../components/ui/button";
import { Home } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Recommendation, FormData } from "../../../../../@types";
import getProducts from "../../../../../services/product.service";
import { getRecommendations } from "../../../../../services/recommendation.service";

export function RecommendationPage() {
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  useEffect(() => {
    const fetchRecommendations = () => {
      try {
        const userData = sessionStorage.getItem("user_preferences");
        if (!userData) {
          throw new Error(
            "Dados do usuário não encontrados. Por favor, preencha o formulário."
          );
        }

        const formData: FormData = JSON.parse(userData);

        if (!products) {
          throw new Error("Produtos não disponíveis no momento.");
        }

        const adherenceResults = getRecommendations(formData, products);

        const filteredRecommendations = adherenceResults.filter(
          (rec) => rec.adherence > 0
        );

        let finalRecommendations: Recommendation[] = [];

        if (formData.productSelection === "SingleProduct") {
          finalRecommendations = filteredRecommendations.slice(0, 1);
        } else {
          finalRecommendations = filteredRecommendations;
        }

        setRecommendations(finalRecommendations);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
          navigate("/products/recommendation/1");
        } else {
          console.error("Erro desconhecido:", err);
        }
      }
    };

    if (products) {
      fetchRecommendations();
    }
  }, [products, navigate]);

  if (isLoading) {
    return (
      <main className="w-full">
        <header className="w-full bg-slate-200 py-7 flex justify-center">
          <Logo />
        </header>

        <div className="w-full mt-10 flex flex-col items-center">
          <h1 className="font-bold text-2xl">Produtos Recomendados</h1>
          <span className="w-36 h-1 bg-slate-400/35 rounded-xl mt-2" />

          <div className="w-full max-w-[960px] grid grid-cols-3 gap-10 mt-20">
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
          <h1 className="font-bold text-2xl">Produtos Recomendados</h1>
          <span className="w-36 h-1 bg-slate-400/35 rounded-xl mt-2" />

          <div className="w-full max-w-[960px] grid grid-cols-3 gap-10 mt-20">
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
        <h1 className="font-bold text-2xl">Produtos Recomendados</h1>
        <span className="w-36 h-1 bg-slate-400/35 rounded-xl mt-2" />

        <div className="w-full max-w-[960px] grid grid-cols-3 gap-10 mt-20">
          {recommendations.length === 0 ? (
            <div className="w-full col-span-3 rounded-xl border-2 border-slate-400 p-4">
              <p className="text-xl text-gray-700">
                Nenhum produto recomendado com base nas suas preferências e
                funcionalidades selecionadas.
              </p>
            </div>
          ) : (
            recommendations.map(({ product, adherence }) => (
              <div
                key={product.id}
                className="w-full rounded-xl border-2 border-slate-400 p-4 flex flex-col gap-2"
              >
                <h2 className="font-semibold text-xl">{product.name}</h2>
                <p className="text-gray-600">Categoria: {product.category}</p>
                <p className="text-gray-600">Match: {adherence}%</p>
              </div>
            ))
          )}
        </div>

        {recommendations.length > 0 && (
          <Button
            onClick={() => navigate("/")}
            className="mt-10 flex items-center space-x-2"
          >
            <span>Voltar para o início</span> <Home size={24} color="#fff" />
          </Button>
        )}
      </div>
    </main>
  );
}
