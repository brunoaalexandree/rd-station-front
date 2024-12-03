"use client";

import { Button } from "../../../../../components/ui/button";
import { Label } from "../../../../../components/ui/label";
import { FormField, FormItem } from "../../../../../components/ui/form";
import { ArrowRight } from "lucide-react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../../../../components/ui/radio-group";
import { useNavigate } from "react-router-dom";

interface Step4FormInputs {
  productSelection: "SingleProduct" | "MultipleProducts";
}

export function Step4() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step4FormInputs>({
    defaultValues: {
      productSelection: undefined,
    },
  });

  const onSubmit: SubmitHandler<Step4FormInputs> = (data) => {
    const existingData = sessionStorage.getItem("user_preferences");
    const parsedData = existingData ? JSON.parse(existingData) : {};

    const updatedData = {
      ...parsedData,
      productSelection: data.productSelection,
    };

    sessionStorage.setItem("user_preferences", JSON.stringify(updatedData));

    navigate("/products/recommendation");
  };

  const selectedProductSelection = watch("productSelection");

  return (
    <div className="flex w-full h-screen">
      <div className="flex w-1/2 bg-[#042A36] flex-col justify-center items-end">
        <ul className="mr-[-22px] z-20 flex flex-col gap-10 items-end">
          <li className="text-white flex gap-2 items-center text-xl">
            Informações do usuário{" "}
            <span className="w-11 h-11 bg-[#19C1CE] flex items-center justify-center rounded-full">
              1
            </span>
          </li>
          <li className="text-white flex gap-2 items-center text-xl">
            Preferências
            <span className="w-11 h-11 bg-[#19C1CE] flex items-center justify-center rounded-full">
              2
            </span>
          </li>
          <li className="text-white flex gap-2 items-center text-xl">
            Funcionalidades
            <span className="w-11 h-11 bg-[#19C1CE] flex items-center justify-center rounded-full">
              3
            </span>
          </li>
          <li className="text-white flex gap-2 items-center text-xl">
            Seleção de Produtos
            <span className="w-11 h-11 bg-[#19C1CE] flex items-center justify-center rounded-full">
              4
            </span>
          </li>
        </ul>
      </div>

      <div className="w-full bg-white flex justify-center flex-col items-start">
        <div className="w-full max-w-[720px] p-8 flex flex-col bg-white gap-8 items-end">
          <div className="w-full pl-10 flex flex-col gap-6">
            <form
              className="w-full flex items-start flex-col gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormField
                control={control}
                name="productSelection"
                render={() => (
                  <FormItem className="w-full">
                    <Label>
                      Como você deseja receber as recomendações de produtos?
                    </Label>
                    <Controller
                      name="productSelection"
                      control={control}
                      rules={{ required: "Por favor, selecione uma opção." }}
                      render={({ field }) => (
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="mt-4 flex flex-col gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="SingleProduct"
                              id="single-product"
                            />
                            <label
                              htmlFor="single-product"
                              className="text-gray-700"
                            >
                              Um único produto
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="MultipleProducts"
                              id="multiple-products"
                            />
                            <label
                              htmlFor="multiple-products"
                              className="text-gray-700"
                            >
                              Vários produtos
                            </label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                    {errors.productSelection && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.productSelection.message}
                      </span>
                    )}
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full mt-4"
                disabled={!selectedProductSelection}
              >
                Ver Produtos <ArrowRight size={24} color="#fff" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
