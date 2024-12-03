import axios, { AxiosResponse } from "axios";
import { Product } from "../@types";
import { api } from "../configurations/api";

const getProducts = async (): Promise<Product[]> => {
  try {
    const response: AxiosResponse<Product[]> = await api().get(`/products`);
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
