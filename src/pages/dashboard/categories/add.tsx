import { type NextPage } from "next";
import { useRouter } from "next/router";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

import { MaterialSymbol } from "react-material-symbols";
import Input from "~/components/Input/Input";
import Button from "~/components/ui/Button";
import { api } from "~/utils/api";
import { useUploadThing } from "~/utils/uploadthing";
import { type ICategory } from "~/utils/validation/category";

const CreateCategorPage: NextPage = () => {
  const router = useRouter();
  const { error } = router.query;
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ICategory>();

  const createMutation = api.category.createCategory.useMutation({
    onSuccess: () => router.push("/dashboard/categories"),
  });

  const onSubmit: SubmitHandler<ICategory> = (data, e) => {
    e?.preventDefault();

    createMutation.mutate({ ...data });
  };

  const { startUpload, isUploading } = useUploadThing("madingThumbnail");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 border p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {error && (
          <p className="text-center text-red-600">
            Posting mading gagal, coba lagi!
          </p>
        )}
        <Controller
          control={control}
          name="name"
          rules={{ required: true, minLength: 3, maxLength: 30 }}
          render={({ field }) => (
            <Input label="Nama Kategori" type="text" {...field} />
          )}
        />
        <Button
          type="submit"
          intent="primary"
          hoverEffect={false}
          className="group flex items-center justify-center gap-1"
          disabled={isUploading}
        >
          <span className="no-underline underline-offset-4 group-hover:underline">
            Submit
          </span>
          <MaterialSymbol
            icon="upload_file"
            fill={false}
            weight={200}
            grade={0}
            size={20}
          />
        </Button>
      </form>
    </div>
  );
};

export default CreateCategorPage;
