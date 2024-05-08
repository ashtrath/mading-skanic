import { type Categories } from "@prisma/client";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";

import { api } from "~/utils/api";
import { type IMading } from "~/utils/validation/mading";

const CreateMadingForm = () => {
  const router = useRouter();
  const { error } = router.query;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMading>();

  const createMutation = api.mading.createMading.useMutation();
  const onSubmit: SubmitHandler<IMading> = (data, e) => {
    e?.preventDefault();

    createMutation.mutate({ ...data });
  };

  const getCategory = api.category.getAllCategory.useQuery();

  return (
    <div className="radius flex flex-col items-center gap-2 border p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {error && (
          <p className="text-center text-red-600">
            Posting mading gagal, coba lagi!
          </p>
        )}
        <label>Judul Mading</label>
        <input
          className="rounded border px-4 py-1"
          type="text"
          {...register("title", { required: true })}
        />
        {errors.title && <span>This field is required</span>}
        <label>Deskripsi</label>
        <textarea
          className="rounded border px-4 py-1"
          {...register("description", { required: true })}
        />
        {errors.description && <span>This field is required</span>}
        <label>Thumbnail</label>
        <input
          className="rounded border px-4 py-1"
          type="text"
          {...register("thumbnail", { required: true })}
        />
        {errors.thumbnail && <span>This field is required</span>}
        <div className="flex gap-2">
          <input
            type="checkbox"
            placeholder="Tandai sebagai penting!"
            id="prioritas"
            {...register("priority", {})}
          />
          <label htmlFor="prioritas">Tandai sebagai penting!</label>
        </div>
        <label htmlFor=""></label>
        {errors.priority && <span>This field is required</span>}
        <label>Kategori</label>
        <select
          className="rounded border bg-white px-4 py-1"
          {...register("categoryId", { required: true })}
        >
          {getCategory.data?.map((category: Categories) => {
            console.log(category.id);

            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
        {errors.categoryId && <span>This field is required</span>}
        <label>Artikel</label>
        <textarea
          className="rounded border px-4 py-1"
          {...register("article", {})}
        />
        {errors.description && <span>This field is required</span>}
        <input
          type="submit"
          disabled={createMutation.isPending}
          className="rounded border px-4 py-1"
        />
      </form>
    </div>
  );
};

export default CreateMadingForm;
