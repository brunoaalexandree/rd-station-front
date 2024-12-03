import { generatePath } from "react-router-dom";

const products = "products";
const recommendation = "recommendation";
const form = "form";

export const routes = {
  goToProducts: () => {
    return generatePath(`/${products}`);
  },
  goToRecommendation: () => {
    return generatePath(`/${products}/${recommendation}`);
  },
  goToForm: () => {
    return generatePath(`/${products}/${recommendation}/${form}`);
  },
  recommendation,
  products,
  form,
};
