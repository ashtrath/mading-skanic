import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

import { MaterialSymbol } from "react-material-symbols";
import { api } from "~/utils/api";
import type { IRegister } from "~/utils/validation/auth";
import Input from "../Input/Input";
import Button, { buttonVariants } from "../ui/Button";

export const RegisterForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const mutation = api.auth.register.useMutation({
    onError: (e) => setErrorMessage(e.message),
    onSuccess: () => router.push("/auth/login"),
  });

  const { control, handleSubmit } = useForm<IRegister>();

  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    setErrorMessage(undefined);
    await mutation.mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <Controller
          control={control}
          name="namaSiswa"
          render={({ field }) => (
            <Input label="Nama Lengkap" type="text" {...field} />
          )}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input label="Email" type="email" {...field} />
          )}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <Input label="Username" type="text" {...field} />
          )}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Controller
          control={control}
          name="nisn"
          render={({ field }) => <Input label="NISN" type="text" {...field} />}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input label="Password" type="password" {...field} />
          )}
        />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Link
          href={"/auth/login"}
          className={`${buttonVariants({ intent: "secondary" })} group`}
        >
          <span className="underline-offset-4 group-hover:underline">
            Login
          </span>
        </Link>
        <Button
          type="submit"
          intent="primary"
          hoverEffect={false}
          className="group flex items-center gap-1"
        >
          <span className="no-underline underline-offset-4 group-hover:underline">
            Daftar
          </span>
          <MaterialSymbol
            icon="arrow_forward"
            fill={false}
            weight={200}
            grade={0}
            size={20}
          />
        </Button>
      </div>
    </form>
  );
};
