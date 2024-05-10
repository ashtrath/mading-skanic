import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";

import { MaterialSymbol } from "react-material-symbols";
import type { ILogin } from "~/utils/validation/auth";
import Button, { buttonVariants } from "../ui/Button";

export const LoginForm = () => {
  const router = useRouter();
  const { error } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  const onSubmit: SubmitHandler<ILogin> = async (data, e) => {
    e?.preventDefault();
    await signIn("credentials", { ...data, callbackUrl: "/" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <label htmlFor="identifier" className="font-mono text-sm uppercase">
          Username / Email
        </label>
        <input
          id="identifier"
          type="text"
          className="border-mono-black bg-mono-white p-2.5 text-sm focus:border-x-2 focus:border-mono-black focus:ring-0"
          {...register("username", { required: true })}
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
      <div className="mb-4 mt-2 flex w-full items-center justify-between">
        <div className="flex items-center gap-1">
          <input
            type="checkbox"
            id="remember-credentials"
            className="border-mono-black bg-mono-white text-mono-black focus:outline-none focus:ring-0 focus:ring-offset-0"
          />
          <label htmlFor="remember-credentials" className="text-xs">
            Ingat Saya
          </label>
        </div>
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
