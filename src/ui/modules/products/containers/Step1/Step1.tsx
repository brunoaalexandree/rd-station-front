import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";
import { FormField, FormItem } from "../../../../../components/ui/form";
import { ArrowRight } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface Step1FormInputs {
  fullName: string;
  email: string;
  profession: string;
}

export function Step1() {
  const { control, handleSubmit } = useForm<Step1FormInputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Step1FormInputs> = (data) => {
    sessionStorage.setItem("user_preferences", JSON.stringify(data));

    navigate("/products/recommendation/2");
  };

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
          <div className="w-full pl-10 flex">
            <form
              className="w-full flex items-start flex-col gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormField
                control={control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Label>Nome Completo</Label>
                    <Input
                      {...field}
                      className="w-full"
                      placeholder="Nome Completo"
                      type="text"
                      required
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Label>E-mail</Label>
                    <Input
                      {...field}
                      className="w-full"
                      placeholder="email@email.com"
                      type="email"
                      required
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="profession"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Label>Profissão / Empresa</Label>
                    <Input
                      {...field}
                      className="w-full"
                      placeholder="Profissão / Empresa"
                      type="text"
                      required
                    />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-4">
                Próximo <ArrowRight size={24} color="#fff" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
