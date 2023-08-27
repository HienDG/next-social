"use client";

import React from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { FormController, InputField, Button } from "@src/components/ui";

import { useModal } from "@src/hooks";
import { signInSchema, type SignInSchema } from "@src/lib/validators";
import { SIGN_UP_URL, HOME_URL, FORGOT_PASSWORD_URL } from "@src/utils/config";

const SignIn: React.FC = () => {
  const router = useRouter();
  const { onClose, onOpen } = useModal();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
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

      <div className="flex flex-col">
        <Link
          href={FORGOT_PASSWORD_URL}
          className="my-4 text-error text-end w-full hover:underline font-semibold cursor-pointer block"
        >
          Forgot password ?
        </Link>

        <Button
          type="submit"
          className="w-full rounded-full hover:text-base-100"
          variant="primary"
          disabled={!isValid || !isDirty}
        >
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
