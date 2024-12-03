import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { ProductsRoutes } from "../ui/modules/products/routes";
import { InitialPage } from "../ui/modules/onboarding/containers/InitialPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<InitialPage />} />
      <Route path={`products/*`} element={<ProductsRoutes />} />
    </>
  )
);
