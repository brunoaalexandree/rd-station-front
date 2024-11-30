// // src/services/recommendation.test.ts

// import { FormData, Product } from "@/@types";
// import recommendationService from "./recommendation.service";

// // Mock dos produtos para os testes
// const mockProducts: Product[] = [
//   {
//     id: "1",
//     name: "RD Station CRM",
//     category: "Vendas",
//     preferences: [
//       "Integração fácil com ferramentas de e-mail",
//       "Personalização de funis de vendas",
//       "Relatórios avançados de desempenho de vendas",
//     ],
//     features: [
//       "Gestão de leads e oportunidades",
//       "Automação de fluxos de trabalho de vendas",
//       "Rastreamento de interações com clientes",
//     ],
//   },
//   {
//     id: "2",
//     name: "RD Station Marketing",
//     category: "Marketing",
//     preferences: [
//       "Automação de marketing",
//       "Testes A/B para otimização de campanhas",
//       "Segmentação avançada de leads",
//     ],
//     features: [
//       "Criação e gestão de campanhas de e-mail",
//       "Rastreamento de comportamento do usuário",
//       "Análise de ROI de campanhas",
//     ],
//   },
//   {
//     id: "3",
//     name: "RD Conversas",
//     category: "Omnichannel",
//     preferences: [
//       "Integração com chatbots",
//       "Histórico unificado de interações",
//       "Respostas automáticas e personalizadas",
//     ],
//     features: [
//       "Gestão de conversas em diferentes canais",
//       "Chat ao vivo e mensagens automatizadas",
//       "Integração com RD Station CRM e Marketing",
//     ],
//   },
// ];

// describe("recommendationService", () => {
//   test("Retorna recomendação correta para SingleProduct com base nas preferências selecionadas", () => {
//     const formData: FormData = {
//       selectedPreferences: ["Integração com chatbots"],
//       selectedFeatures: ["Chat ao vivo e mensagens automatizadas"],
//       selectedRecommendationType: "SingleProduct",
//     };

//     const recommendations = recommendationService.getRecommendations(
//       formData,
//       mockProducts
//     );

//     expect(recommendations).toHaveLength(1);
//     expect(recommendations[0].product.name).toBe("RD Conversas");
//   });

//   test("Retorna recomendações corretas para MultipleProducts com base nas preferências selecionadas", () => {
//     const formData: FormData = {
//       selectedPreferences: [
//         "Integração fácil com ferramentas de e-mail",
//         "Personalização de funis de vendas",
//         "Automação de marketing",
//       ],
//       selectedFeatures: [
//         "Rastreamento de interações com clientes",
//         "Rastreamento de comportamento do usuário",
//       ],
//       selectedRecommendationType: "MultipleProducts",
//     };

//     const recommendations = recommendationService.getRecommendations(
//       formData,
//       mockProducts
//     );

//     expect(recommendations).toHaveLength(2);
//     expect(recommendations.map((rec) => rec.product.name)).toEqual([
//       "RD Station CRM",
//       "RD Station Marketing",
//     ]);
//   });

//   test("Retorna apenas um produto para SingleProduct com mais de um produto de match", () => {
//     const formData: FormData = {
//       selectedPreferences: [
//         "Integração fácil com ferramentas de e-mail",
//         "Automação de marketing",
//       ],
//       selectedFeatures: [
//         "Rastreamento de interações com clientes",
//         "Rastreamento de comportamento do usuário",
//       ],
//       selectedRecommendationType: "SingleProduct",
//     };

//     const recommendations = recommendationService.getRecommendations(
//       formData,
//       mockProducts
//     );

//     expect(recommendations).toHaveLength(1);
//     expect(recommendations[0].product.name).toBe("RD Station Marketing");
//   });

//   test("Retorna o último match em caso de empate para SingleProduct", () => {
//     const formData: FormData = {
//       selectedPreferences: [
//         "Automação de marketing",
//         "Integração com chatbots",
//       ],
//       selectedFeatures: [],
//       selectedRecommendationType: "SingleProduct",
//     };

//     const recommendations = recommendationService.getRecommendations(
//       formData,
//       mockProducts
//     );

//     expect(recommendations).toHaveLength(1);
//     expect(recommendations[0].product.name).toBe("RD Conversas");
//   });

//   test("Retorna todas as recomendações com aderência correta para MultipleProducts", () => {
//     const formData: FormData = {
//       selectedPreferences: ["Automação de marketing"],
//       selectedFeatures: ["Rastreamento de comportamento do usuário"],
//       selectedRecommendationType: "MultipleProducts",
//     };

//     const recommendations = recommendationService.getRecommendations(
//       formData,
//       mockProducts
//     );

//     expect(recommendations).toHaveLength(2);
//     expect(recommendations[0].product.name).toBe("RD Station Marketing");
//     expect(recommendations[0].adherence).toBeCloseTo(75.0);
//     expect(recommendations[1].product.name).toBe("RD Station CRM");
//     expect(recommendations[1].adherence).toBeCloseTo(50.0);
//   });

//   test("Retorna uma lista vazia quando nenhum produto corresponde às preferências", () => {
//     const formData: FormData = {
//       selectedPreferences: ["Preferência inexistente"],
//       selectedFeatures: ["Funcionalidade inexistente"],
//       selectedRecommendationType: "MultipleProducts",
//     };

//     const recommendations = recommendationService.getRecommendations(
//       formData,
//       mockProducts
//     );

//     expect(recommendations).toHaveLength(3); // Todos terão aderência 0%
//     recommendations.forEach((rec) => {
//       expect(rec.adherence).toBe(0);
//     });
//   });

//   test("Retorna apenas um produto com maior aderência para SingleProduct", () => {
//     const formData: FormData = {
//       selectedPreferences: [
//         "Automação de marketing",
//         "Segmentação avançada de leads",
//       ],
//       selectedFeatures: ["Rastreamento de comportamento do usuário"],
//       selectedRecommendationType: "SingleProduct",
//     };

//     const recommendations = recommendationService.getRecommendations(
//       formData,
//       mockProducts
//     );

//     expect(recommendations).toHaveLength(1);
//     expect(recommendations[0].product.name).toBe("RD Station Marketing");
//   });
// });
