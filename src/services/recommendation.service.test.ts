import { getRecommendations } from "./recommendation.service";
import { FormData, Product } from "../@types";

const mockProducts: Product[] = [
  {
    id: "1",
    name: "RD Station CRM",
    category: "Vendas",
    preferences: [
      "Integração fácil com ferramentas de e-mail",
      "Personalização de funis de vendas",
      "Relatórios avançados de desempenho de vendas",
    ],
    features: [
      "Gestão de leads e oportunidades",
      "Automação de fluxos de trabalho de vendas",
      "Rastreamento de interações com clientes",
    ],
  },
  {
    id: "2",
    name: "RD Station Marketing",
    category: "Marketing",
    preferences: [
      "Automação de marketing",
      "Testes A/B para otimização de campanhas",
      "Segmentação avançada de leads",
    ],
    features: [
      "Criação e gestão de campanhas de e-mail",
      "Rastreamento de comportamento do usuário",
      "Análise de ROI de campanhas",
    ],
  },
  {
    id: "3",
    name: "RD Conversas",
    category: "Omnichannel",
    preferences: [
      "Integração com chatbots",
      "Histórico unificado de interações",
      "Respostas automáticas e personalizadas",
    ],
    features: [
      "Gestão de conversas em diferentes canais",
      "Chat ao vivo e mensagens automatizadas",
      "Integração com RD Station CRM e Marketing",
    ],
  },
];

describe("getRecommendations", () => {
  test("Calcula corretamente a aderência e ordena os produtos de forma decrescente", () => {
    const formData: FormData = {
      preferences: ["Automação de marketing"],
      features: ["Rastreamento de comportamento do usuário"],
      productSelection: "MultipleProducts",
      fullName: "John Doe",
      email: "johndoe@email.com",
      profession: "Desenvolvedor",
    };

    const recommendations = getRecommendations(formData, mockProducts);

    for (let i = 0; i < recommendations.length - 1; i++) {
      expect(recommendations[i].adherence).toBeGreaterThanOrEqual(
        recommendations[i + 1].adherence
      );
    }

    expect(recommendations[0].product.name).toBe("RD Station Marketing");
    expect(recommendations[0].adherence).toBeCloseTo(100.0);

    expect(recommendations[1].product.name).toBe("RD Station CRM");
    expect(recommendations[1].adherence).toBeCloseTo(0.0);

    expect(recommendations[2].product.name).toBe("RD Conversas");
    expect(recommendations[2].adherence).toBeCloseTo(0.0);
  });

  test("Retorna uma lista ordenada quando há múltiplas correspondências", () => {
    const formData: FormData = {
      preferences: [
        "Integração fácil com ferramentas de e-mail",
        "Automação de marketing",
      ],
      features: [
        "Gestão de leads e oportunidades",
        "Criação e gestão de campanhas de e-mail",
      ],
      productSelection: "MultipleProducts",
      fullName: "John Doe",
      email: "johndoe@email.com",
      profession: "Desenvolvedor",
    };

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(3);
    expect(recommendations[0].adherence).toBeCloseTo(50.0);
    expect(recommendations[0].product.name).toBe("RD Station CRM");
    expect(recommendations[1].adherence).toBeCloseTo(50.0);
    expect(recommendations[1].product.name).toBe("RD Station Marketing");
    expect(recommendations[2].adherence).toBeCloseTo(0.0);
    expect(recommendations[2].product.name).toBe("RD Conversas");
  });

  test("Calcula a aderência corretamente quando não há correspondências", () => {
    const formData: FormData = {
      preferences: ["Preferência inexistente"],
      features: ["Funcionalidade inexistente"],
      productSelection: "MultipleProducts",
      fullName: "John Doe",
      email: "johndoe@email.com",
      profession: "Desenvolvedor",
    };

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(3);
    recommendations.forEach((rec) => {
      expect(rec.adherence).toBe(0);
    });
  });

  test("Calcula a aderência corretamente quando há múltiplas correspondências em um produto", () => {
    const formData: FormData = {
      preferences: [
        "Automação de marketing",
        "Testes A/B para otimização de campanhas",
      ],
      features: [
        "Criação e gestão de campanhas de e-mail",
        "Rastreamento de comportamento do usuário",
      ],
      productSelection: "MultipleProducts",
      fullName: "John Doe",
      email: "johndoe@email.com",
      profession: "Desenvolvedor",
    };

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(3);
    expect(recommendations[0].product.name).toBe("RD Station Marketing");
    expect(recommendations[0].adherence).toBeCloseTo(100.0);
    expect(recommendations[1].product.name).toBe("RD Station CRM");
    expect(recommendations[1].adherence).toBeCloseTo(0.0);
    expect(recommendations[2].product.name).toBe("RD Conversas");
    expect(recommendations[2].adherence).toBeCloseTo(0.0);
  });

  test("Calcula a aderência corretamente quando há correspondências apenas nas preferências", () => {
    const formData: FormData = {
      preferences: ["Personalização de funis de vendas"],
      features: [],
      productSelection: "MultipleProducts",
      fullName: "John Doe",
      email: "johndoe@email.com",
      profession: "Desenvolvedor",
    };

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(3);
    expect(recommendations[0].product.name).toBe("RD Station CRM");
    expect(recommendations[0].adherence).toBeCloseTo(100.0);
    expect(recommendations[1].product.name).toBe("RD Station Marketing");
    expect(recommendations[1].adherence).toBeCloseTo(0.0);
    expect(recommendations[2].product.name).toBe("RD Conversas");
    expect(recommendations[2].adherence).toBeCloseTo(0.0);
  });

  test("Calcula a aderência corretamente quando há correspondências apenas nas funcionalidades", () => {
    const formData: FormData = {
      preferences: [],
      features: ["Automação de fluxos de trabalho de vendas"],
      productSelection: "MultipleProducts",
      fullName: "John Doe",
      email: "johndoe@email.com",
      profession: "Desenvolvedor",
    };

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(3);
    expect(recommendations[0].product.name).toBe("RD Station CRM");
    expect(recommendations[0].adherence).toBeCloseTo(100.0);
    expect(recommendations[1].product.name).toBe("RD Station Marketing");
    expect(recommendations[1].adherence).toBeCloseTo(0.0);
    expect(recommendations[2].product.name).toBe("RD Conversas");
    expect(recommendations[2].adherence).toBeCloseTo(0.0);
  });
});
