// src/services/product.service.ts

import { Product } from "@/@types";
import axios, { AxiosResponse } from "axios";

const baseURL: string = "http://localhost:3001";

const getProducts = async (): Promise<Product[]> => {
  try {
    const response: AxiosResponse<Product[]> = await axios.get(
      `${baseURL}/products`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Erro ao obter os produtos:", error.message);
    } else {
      console.error("Erro inesperado:", error);
    }
    throw error;
  }
};

export default getProducts;
