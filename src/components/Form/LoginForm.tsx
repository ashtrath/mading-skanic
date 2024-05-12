import { signIn } from "next-auth/react";
import Link from "next/link";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { MaterialSymbol } from "react-material-symbols";

import type { ILogin } from "~/utils/validation/auth";
import Checkbox from "../Input/Checkbox";
import Input from "../Input/Input";
import Button, { buttonVariants } from "../ui/Button";

export const LoginForm = () => {
  const { control, handleSubmit } = useForm<ILogin>();

  const onSubmit: SubmitHandler<ILogin> = async (data, e) => {
    e?.preventDefault();
    await signIn("credentials", { ...data, callbackUrl: "/" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <Input label="Username / Email" type="text" {...field} />
          )}
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
      <div className="mb-4 mt-2 flex w-full items-center justify-between">
        <Checkbox
          name="remember-me"
          label="Ingat Saya"
          checked={false}
          required={false}
          onChange={(e) => {
            console.log(e);
          }}
        />
        <Link href={"/auth/reset-password"} className="text-xs hover:underline">
          Lupa Password?
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={"/auth/signup"}
          className={buttonVariants({ intent: "secondary" })}
        >
          Daftar
        </Link>
        <Button
          type="submit"
          intent="primary"
          hoverEffect={false}
          className="group flex items-center gap-1"
        >
          <span className="no-underline underline-offset-4 group-hover:underline">
            Login
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
