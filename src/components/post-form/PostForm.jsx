import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredimage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredimage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredimage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userID: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap p-4 bg-white shadow-lg rounded-lg space-y-6 md:space-y-0 md:space-x-6">
      <div className="w-full md:w-2/3">
        <Input
          label="Title :"
          placeholder="Enter the post title"
          className="mb-4 p-3 border border-gray-300 rounded-lg focus:border-blue-500"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Auto-generated slug"
          className="mb-4 p-3 border border-gray-300 rounded-lg focus:border-blue-500"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          className="mb-4 p-3 border border-gray-300 rounded-lg"
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-full md:w-1/3 flex flex-col space-y-4">
        <Input
          label="Featured Image :"
          type="file"
          className="p-3 border border-gray-300 rounded-lg focus:border-blue-500"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full">
            <img
              src={appwriteService.getFilePreview(post.featuredimage)}
              alt={post.title}
              className="rounded-lg border border-gray-200"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="p-3 border border-gray-300 rounded-lg focus:border-blue-500"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}
          className="w-full text-white py-3 rounded-lg transition duration-300"
        >
          {post ? "Update Post" : "Submit Post"}
        </Button>
      </div>
    </form>
  );
}
