import { useRouter } from "next/router";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

import { DevTool } from "@hookform/devtools";
import { MaterialSymbol } from "react-material-symbols";
import { imageToBlobHandler } from "~/utils";
import { api } from "~/utils/api";
import { useUploadThing } from "~/utils/uploadthing";
import { type IMading } from "~/utils/validation/mading";

import Editor from "../Editor";
import Checkbox from "../Input/Checkbox";
import ImageUpload from "../Input/ImageUpload";
import Input from "../Input/Input";
import Select from "../Input/Select";
import TextArea from "../Input/TextArea";
import Button from "../ui/Button";

const CreateMadingForm = () => {
  const router = useRouter();
  const { error } = router.query;
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<IMading>();

  const createMutation = api.mading.createMading.useMutation();
  const onSubmit: SubmitHandler<IMading> = (data, e) => {
    e?.preventDefault();

    createMutation.mutate({ ...data });
  };

  const getCategory = api.category.getAllCategory.useQuery(
    {},
    { refetchOnWindowFocus: false },
  );

  const { startUpload, isUploading } = useUploadThing("madingThumbnail");

  return (
    <div className="radius flex flex-col items-center gap-2 border p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {error && (
          <p className="text-center text-red-600">
            Posting mading gagal, coba lagi!
          </p>
        )}
        <Controller
          control={control}
          name="title"
          rules={{ required: true, minLength: 5, maxLength: 191 }}
          render={({ field }) => <Input label="Judul" type="text" {...field} />}
        />
        {errors.title && <span>This field is required</span>}
        <Controller
          control={control}
          name="description"
          rules={{ required: true, minLength: 5 }}
          render={({ field }) => <TextArea label="Deskripsi" {...field} />}
        />
        {errors.description && <span>This field is required</span>}
        <label className="font-mono text-sm uppercase">Thumbnail</label>
        <Controller
          name="thumbnail"
          control={control}
          render={({ field }) => (
            <ImageUpload
              {...field}
              minHeight={"10rem"}
              customTypes=".png,.jpg,.jpeg,.webp"
              recommendedText="Recommended dimension is 1600 x 840"
              handleChange={async (event) => {
                const file = event?.target?.files?.[0];
                if (!file) return;

                const image = await imageToBlobHandler(file);
                if (!image) return;

                if (isUploading) {
                  console.log("Already Uploading");
                  return;
                }

                const uploaded = await startUpload([image]);
                if (!uploaded) {
                  console.log("Failed to upload!");
                  return;
                }

                setValue("thumbnail", uploaded[0]?.url ?? null);
              }}
            />
          )}
        />
        {errors.thumbnail && <span>This field is required</span>}
        <Controller
          control={control}
          name="priority"
          defaultValue={false}
          render={({ field: { name, onChange, value } }) => (
            <Checkbox
              name={name}
              value={false}
              required={false}
              onChange={onChange}
              label="Tandai sebagai mading penting!"
            />
          )}
        />
        {errors.priority && <span>This field is required</span>}
        {getCategory.data && (
          <Controller
            control={control}
            name="categoryId"
            render={({ field: { name, onChange } }) => (
              <Select
                name={name}
                label="Kategori"
                defaultText="Kategori"
                options={(() => {
                  const res = getCategory.data?.map(({ id, name }) => ({
                    label: name,
                    value: id,
                  }));
                  console.log(res);
                  return res;
                })()}
                onChange={(event) => {
                  onChange(event.value);
                }}
              />
            )}
          />
        )}
        {errors.categoryId && <span>This field is required</span>}
        <Controller
          control={control}
          name="article"
          render={({ field: { value, onChange } }) => (
            <Editor label="Artikel" data={value} onChange={onChange} />
          )}
        />
        {errors.categoryId && <span>This field is required</span>}
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
      <DevTool control={control} />
    </div>
  );
};

export default CreateMadingForm;
