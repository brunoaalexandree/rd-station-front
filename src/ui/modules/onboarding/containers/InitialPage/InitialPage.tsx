import { Package, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../components/ui/button";

export function InitialPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-8">
        Recomendador de Produtos RD Station
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-3/4 lg:w-1/2 flex flex-col items-center">
        <div className="col-span-2 mb-4">
          <p className="text-lg">
            Bem-vindo ao Recomendador de Produtos RD Station. Aqui você pode
            encontrar uma variedade de produtos da RD Station, cada um projetado
            para atender às necessidades específicas do seu negócio. De CRM a
            Marketing, de Conversas a Inteligência Artificial, temos uma solução
            para ajudar você a alcançar seus objetivos. Use o formulário abaixo
            para selecionar suas preferências e funcionalidades desejadas e
            receba recomendações personalizadas de produtos que melhor atendam
            às suas necessidades.
          </p>
        </div>

        <div className="flex gap-10">
          <Button
            onClick={() => navigate("/products")}
            className="mt-10 flex items-center space-x-2"
          >
            <span>Ver Produtos</span> <Package size={24} color="#fff" />
          </Button>
          <Button
            onClick={() => navigate("/products/recommendation/1")}
            className="mt-10 flex items-center space-x-2"
          >
            <span>Descobrir Produtos</span> <Search size={24} color="#fff" />
          </Button>
        </div>
      </div>
    </div>
  );
}
