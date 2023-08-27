"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

import { FormController, InputField, Button } from "@src/components/ui";

import { resetSchema, type ResetSchema } from "@src/lib/validators";
import { SIGN_IN_URL } from "@src/utils/config";

interface ResetFormProps {
  email: string;
}

const ResetForm: React.FC<ResetFormProps> = ({ email }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm<ResetSchema>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      for (const [, value] of Object.entries(errors)) {
        toast.error(value.message as string);
      }
    }
  }, [errors]);

  const onSubmit: SubmitHandler<ResetSchema> = async ({ password }) => {
    setIsLoading(true);
    try {
      await axios.patch("/api/auth/reset_password", { email, password });

      reset(); // clear user input

      router.push(SIGN_IN_URL);
    } catch (error: unknown) {
      toast.error("something went wrong");
    }

    setIsLoading(false);
  };

  if (isLoading)
    return (
      <div className="w-full flex items-center justify-center py-3">
        <ClipLoader size={40} color="#0284c7" />
      </div>
    );

  return (
    <FormController className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <InputField placeholder="Password" type="password" {...register("password")} />
      <InputField placeholder="Confirm password" type="password" {...register("confirmPassword")} />

      <Button className="text-base-100 w-full" variant="secondary" disabled={!isDirty}>
        Reset password
      </Button>
    </FormController>
  );
};
export default ResetForm;
