"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

import { AiOutlineKey, AiOutlineArrowLeft } from "react-icons/ai";

import { FormController, InputField, Button } from "@src/components/ui";

import { forgotPasswordSchema, type ForgotPasswordSchema } from "@src/lib/validators";
import { SIGN_IN_URL, RESET_PASSWORD_URL } from "@src/utils/config";

interface ForgotPageProps {}

const ForgotPage: React.FC<ForgotPageProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    formState: { errors, isDirty },
    reset,
    handleSubmit,
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordSchema> = async ({ email }) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/auth/forgot_password", { email });

      reset(); // clear user input

      router.push(`${RESET_PASSWORD_URL}/${email}/${data.data.id}`);
    } catch (error: unknown) {
      console.error(error);
      toast.error("something went wrong");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      for (const [, value] of Object.entries(errors)) {
        toast.error(value.message as string);
      }
    }
  }, [errors]);

  return (
    <div className="text-base mx-auto max-w-7xl w-full p-4 h-screen flex items-center justify-center">
      <section className="w-[600px]  bg-base-100 p-12 mx-auto shadow-lg rounded-lg ring-1 space-y-6">
        <div className="flex items-center justify-center ">
          <AiOutlineKey className="w-10 h-10 text-primary" />
        </div>

        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">Forgot Password ?</h1>
          <p className="font-light">No worries, we&apos;ll send you reset instructions</p>
        </div>

        <div>
          {!isLoading ? (
            <FormController className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <InputField placeholder="Enter your email" {...register("email")} />

              <Button className="text-base-100 w-full" variant="primary" disabled={!isDirty}>
                Reset password
              </Button>
            </FormController>
          ) : (
            <div className="w-full flex items-center justify-center py-3">
              <ClipLoader size={40} color="#0284c7" />
            </div>
          )}
        </div>

        <div>
          <Link
            href={SIGN_IN_URL}
            className="flex item-center justify-center gap-1 opacity-9o group cursor-pointer"
          >
            <AiOutlineArrowLeft className="w-5 h-5" />
            <p className="group-hover:underline">Back to login</p>
          </Link>
        </div>
      </section>
    </div>
  );
};
export default ForgotPage;
