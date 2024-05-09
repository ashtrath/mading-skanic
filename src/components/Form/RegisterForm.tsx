import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { MaterialSymbol } from "react-material-symbols";
import { api } from "~/utils/api";
import type { IRegister } from "~/utils/validation/auth";
import Button, { buttonVariants } from "../ui/Button";

export const RegisterForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const mutation = api.auth.register.useMutation({
    onError: (e) => setErrorMessage(e.message),
    onSuccess: () => router.push("/auth/login"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>();

  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    setErrorMessage(undefined);
    await mutation.mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <label htmlFor="namaSiswa" className="font-mono text-sm uppercase">
          Nama Lengkap
        </label>
        <input
          id="namaSiswa"
          type="text"
          className="border-mono-black bg-mono-white p-2.5 text-sm focus:border-x-2 focus:border-mono-black focus:ring-0"
          {...register("namaSiswa", { required: true })}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-mono text-sm uppercase">
          Email
        </label>
        <input
          id="email"
          type="text"
          className="border-mono-black bg-mono-white p-2.5 text-sm focus:border-x-2 focus:border-mono-black focus:ring-0"
          {...register("email", { required: true })}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="username" className="font-mono text-sm uppercase">
          Username
        </label>
        <input
          id="username"
          type="text"
          className="border-mono-black bg-mono-white p-2.5 text-sm focus:border-x-2 focus:border-mono-black focus:ring-0"
          {...register("username", { required: true })}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="nisn" className="font-mono text-sm uppercase">
          NISN
        </label>
        <input
          id="nisn"
          type="text"
          className="border-mono-black bg-mono-white p-2.5 text-sm focus:border-x-2 focus:border-mono-black focus:ring-0"
          {...register("nisn", { required: true })}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="font-mono text-sm uppercase">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="border-mono-black bg-mono-white p-2.5 text-sm focus:border-x-2 focus:border-mono-black focus:ring-0"
          {...register("password", { required: true })}
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
