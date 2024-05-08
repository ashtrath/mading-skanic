import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";

import type { ILogin } from "~/utils/validation/auth";

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
    <div className="radius flex flex-col items-center gap-2 border p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {error && (
          <p className="text-center text-red-600">Login failed, try again!</p>
        )}
        <label>Username / Email</label>
        <input
          className="rounded border px-4 py-1"
          type="text"
          {...register("username", { required: true })}
        />
        {errors.username && <span>This field is required</span>}
        <label>Password</label>
        <input
          className="rounded border px-4 py-1"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>This field is required</span>}

        <input type="submit" className="rounded border px-4 py-1" />
      </form>
    </div>
  );
};
