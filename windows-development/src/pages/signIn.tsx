import { PageProps } from "./_app";
import { NextPage } from "next";
import { LoginCredentials } from "@customTypes/api.types";
import { useAuth } from "@hooks/api/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import Image from "next/image";
import { Input } from "@components/UI/Input";
import clsx from "clsx";

type TFormProps = LoginCredentials;

const SignInPage: NextPage<PageProps> = () => {
  const { signIn, authError } = useAuth();

  useEffect(() => {
    if (authError) {
      setError("password", {
        message: authError,
      });
    }
  }, [authError]);

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<TFormProps>();

  const onSubmit: SubmitHandler<TFormProps> = async (data) => {
    await signIn(data);
  };

  return (
    <>
      <header className="boxShadow z-20 w-full shadow-2xl">
        <div className="flex justify-center py-7">
          <Image src="/icons/logo.svg" width={187} height={126} alt="logo" />
        </div>
      </header>
      <div className="z-10 flex h-screen bg-[#F5F5F6]">
        <div className="mx-auto mt-32 w-full max-w-lg">
          <section className="rounded-lg bg-white px-7 py-12">
            <h1 className="text-[27.85px] font-bold uppercase leading-[33px] text-black">
              авторизация
            </h1>
            <div className="mt-4 flex items-baseline">
              <div className="blueGradient h-2 w-2/3" />
              <div className="bg h-1 w-1/3 bg-[#C4C4C4] opacity-40 " />
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={clsx(
                "mt-10",
                isSubmitting && "pointer-events-none opacity-70"
              )}
            >
              <div className="flex flex-col gap-7">
                <Input
                  name="username"
                  label="Логин"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Обязательное поле",
                    },
                  }}
                />
                <Input
                  name="password"
                  type="password"
                  label="Пароль"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Обязательное поле",
                    },
                  }}
                />
                <div className="flex w-full ">
                  <button
                    type="submit"
                    className="ml-auto flex w-24 items-center justify-center rounded-sm bg-accent/90 py-1.5 uppercase text-white hover:bg-accent/100 "
                  >
                    войти
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

SignInPage.defaultProps = {
  isPublic: true,
};

export default SignInPage;
