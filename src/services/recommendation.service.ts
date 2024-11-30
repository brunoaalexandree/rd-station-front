import { Product, Recommendation, FormData } from "@/@types";

const getRecommendations = (
  formData: FormData,
  products: Product[]
): Recommendation[] => {
  const { selectedFeatures, selectedPreferences } = formData;

  // Calcula a aderência com base nas preferências
  const adherenceResults: Recommendation[] = products.map((product) => {
    const preferenceMatches = product.preferences.filter((pref) =>
      selectedPreferences.includes(pref)
    ).length;

    const featureMatches = product.features.filter((feat) =>
      selectedFeatures.includes(feat)
    ).length;

    // Definindo pesos para preferências e funcionalidades, se necessário
    // Por exemplo, preferências podem ter peso 2 e funcionalidades peso 1
    const adherenceScore = preferenceMatches * 2 + featureMatches * 1;

    // Calcula a aderência como uma porcentagem
    const totalPossibleScore =
      selectedPreferences.length * 2 + selectedFeatures.length * 1;

    const adherence =
      totalPossibleScore > 0 ? (adherenceScore / totalPossibleScore) * 100 : 0;

    return {
      product,
      adherence: parseFloat(adherence.toFixed(2)), // Arredonda para 2 casas decimais
    };
  });

  // Ordena os produtos pela aderência em ordem decrescente
  adherenceResults.sort((a, b) => b.adherence - a.adherence);

  return adherenceResults;
};

export default { getRecommendations };
