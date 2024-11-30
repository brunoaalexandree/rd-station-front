export interface Product {
  id: string;
  name: string;
  category: string;
  preferences: string[];
  features: string[];
}

export interface FormData {
  selectedPreferences: string[];
  selectedFeatures: string[];
}

export interface Recommendation {
  product: Product;
  adherence: number;
}
