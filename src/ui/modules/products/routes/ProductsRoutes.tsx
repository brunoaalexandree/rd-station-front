import { Route, Routes } from "react-router-dom";
import { RecommendationPage } from "../containers/Recommendation";
import { ProductsPage } from "../containers/Products";
import { routes } from "../../../../routes/constants/routes";
import { Step1 } from "../containers/Step1";
import { Step2 } from "../containers/Step2";
import { Step3 } from "../containers/Step3";
import { Step4 } from "../containers/Step4";

export function ProductsRoutes() {
  return (
    <Routes>
      <Route index element={<ProductsPage />} />
      <Route path={routes.recommendation}>
        <Route index element={<RecommendationPage />} />

        <Route path="1" element={<Step1 />} />
        <Route path="2" element={<Step2 />} />
        <Route path="3" element={<Step3 />} />
        <Route path="4" element={<Step4 />} />
      </Route>
    </Routes>
  );
}
