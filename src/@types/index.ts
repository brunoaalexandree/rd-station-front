export interface Product {
  id: string;
  name: string;
  category: string;
  preferences: string[];
  features: string[];
}

export interface FormData {
  fullName: string;
  email: string;
  profession: string;
  preferences: string[];
  features: string[];
  productSelection: "SingleProduct" | "MultipleProducts";
}

export interface Recommendation {
  product: Product;
  adherence: number;
}
