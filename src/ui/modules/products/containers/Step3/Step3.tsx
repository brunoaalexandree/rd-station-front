"use client";

import { Button } from "../../../../../components/ui/button";
import { Label } from "../../../../../components/ui/label";
import { FormField, FormItem } from "../../../../../components/ui/form";
import { ArrowRight } from "lucide-react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "../../../../../components/ui/checkbox";

interface Step3FormInputs {
  features: string[];
}

const featuresData = {
  features: [
    "Gestão de leads e oportunidades",
    "Automação de fluxos de trabalho de vendas",
    "Rastreamento de interações com clientes",
    "Criação e gestão de campanhas de e-mail",
    "Rastreamento de comportamento do usuário",
    "Análise de retorno sobre investimento (ROI) de campanhas",
    "Gestão de conversas em diferentes canais",
    "Chat ao vivo e mensagens automatizadas",
    "Integração com RD Station CRM e Marketing",
    "Análise preditiva de dados",
    "Recomendações personalizadas para usuários",
    "Integração com assistentes virtuais",
  ],
};

export function Step3() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step3FormInputs>({
    defaultValues: {
      features: [],
    },
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Step3FormInputs> = (data) => {
    const existingData = sessionStorage.getItem("user_preferences");
    const parsedData = existingData ? JSON.parse(existingData) : {};

    const updatedData = {
      ...parsedData,
      features: data.features,
    };

    sessionStorage.setItem("user_preferences", JSON.stringify(updatedData));

    navigate("/products/recommendation/4");
  };

  const selectedFeatures = watch("features");

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
            Produtos
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
                name="features"
                render={() => (
                  <FormItem className="w-full">
                    <Label>Selecione as Funcionalidades</Label>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {featuresData.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center space-x-2"
                        >
                          <Controller
                            name="features"
                            control={control}
                            render={({ field }) => (
                              <Checkbox
                                id={feature}
                                checked={field.value.includes(feature)}
                                onCheckedChange={(checked: boolean) => {
                                  if (checked) {
                                    field.onChange([...field.value, feature]);
                                  } else {
                                    field.onChange(
                                      field.value.filter(
                                        (item: string) => item !== feature
                                      )
                                    );
                                  }
                                }}
                              />
                            )}
                          />
                          <label
                            htmlFor={feature}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {feature}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.features && (
                      <span className="text-red-500 text-sm mt-1">
                        Por favor, selecione pelo menos uma funcionalidade.
                      </span>
                    )}
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full mt-4"
                disabled={selectedFeatures.length === 0}
              >
                Próximo <ArrowRight size={24} color="#fff" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
