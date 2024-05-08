import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { api } from "~/utils/api";
import type { IRegister } from "~/utils/validation/auth";

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
    <div className="radius flex flex-col items-center gap-2 border p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {errorMessage && (
          <p className="text-center text-red-600">{errorMessage}</p>
        )}
        <label>Nama Lengkap</label>
        <input
          className="rounded border px-4 py-1"
          type="text"
          {...register("namaSiswa", { required: true })}
        />
        {errors.namaSiswa && (
          <p className="text-center text-red-600">This field is required</p>
        )}
        <label>Email</label>
        <input
          className="rounded border px-4 py-1"
          type="text"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="text-center text-red-600">This field is required</p>
        )}
        <label>Username</label>
        <input
          className="rounded border px-4 py-1"
          type="username"
          {...register("username", { required: true })}
        />
        {errors.username && (
          <p className="text-center text-red-600">This field is required</p>
        )}
        <label>NISN</label>
        <input
          className="rounded border px-4 py-1"
          type="text"
          {...register("nisn", { required: true })}
        />
        {errors.username && (
          <p className="text-center text-red-600">This field is required</p>
        )}
        <label>Password</label>
        <input
          className="rounded border px-4 py-1"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className="text-center text-red-600">This field is required</p>
        )}

        <input type="submit" className="rounded border px-4 py-1" />
      </form>
    </div>
  );
};
