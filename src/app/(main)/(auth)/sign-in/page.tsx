"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { FormController, InputField, Button } from "@src/components/ui";

import { useModal } from "@src/hooks";
import { signInSchema, type SignInSchema } from "@src/lib/validators";
import { SIGN_UP_URL, HOME_URL } from "@src/utils/config";
import axios from "axios";

const SignIn: React.FC = () => {
  const router = useRouter();
  const { onClose, onOpen } = useModal();

  const {
    register,
    reset,
    formState: { errors, isLoading },
    handleSubmit,
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: async () => {
      const { data } = await axios.get("/api/remember");

      const { email, password } = data.data;

      return {
        email,
        password,
      };
    },
  });

  const onSubmit: SubmitHandler<SignInSchema> = async ({ email, password }) => {
    onOpen("loading");
    try {
      const res = await signIn("credentials", { email, password, redirect: false });

      if (!res?.ok) throw res?.error;

      reset(); //  clear user input

      router.refresh();
      router.push(HOME_URL);

      toast.success("You are successfully logged in");
    } catch (error: unknown) {
      toast.error("Something went wrong");
    }
    onClose();
  };

  useEffect(() => {
    if (isLoading) {
      onOpen("loading");
    }

    return () => {
      onClose();
    };
  }, [isLoading, onClose, onOpen]);

  return (
    <FormController onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Email"
        id="Email"
        type="email"
        className="h-10"
        errorMessage={errors.email?.message}
        {...register("email")}
      />

      <InputField
        label="Password"
        id="Password"
        type="password"
        className="h-10"
        errorMessage={errors.password?.message}
        {...register("password")}
      />

      <div>
        <div className="my-4 text-primary hover:underline font-semibold w-fit cursor-pointer">
          Forgot password?
        </div>

        <Button type="submit" className="w-full rounded-full hover:text-base-100" variant="primary">
          Sign In
        </Button>
      </div>

      <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
        <div>New to Messenger?</div>
        <a className="underline cursor-pointer hover:text-primary" href={SIGN_UP_URL}>
          Create an account
        </a>
      </div>
    </FormController>
  );
};
export default SignIn;
