import { Product, Recommendation, FormData } from "../@types";

const getRecommendations = (
  formData: FormData,
  products: Product[]
): Recommendation[] => {
  const { features: selectedFeatures, preferences: selectedPreferences } =
    formData;

  const adherenceResults: Recommendation[] = products.map((product) => {
    const preferenceMatches = product.preferences.filter((pref) =>
      selectedPreferences.includes(pref)
    ).length;

    const featureMatches = product.features.filter((feat) =>
      selectedFeatures.includes(feat)
    ).length;

    const adherenceScore = preferenceMatches * 2 + featureMatches * 1;

    const totalPossibleScore =
      selectedPreferences.length * 2 + selectedFeatures.length * 1;

    const adherence =
      totalPossibleScore > 0 ? (adherenceScore / totalPossibleScore) * 100 : 0;

    return {
      product,
      adherence: parseFloat(adherence.toFixed(2)),
    };
  });

  adherenceResults.sort((a, b) => b.adherence - a.adherence);

  return adherenceResults;
};

export { getRecommendations };
