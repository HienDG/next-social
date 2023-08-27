"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { FormController, InputField, Button } from "@src/components/ui";

import { useModal } from "@src/hooks";
import { signUpSchema, type SignUpSchema } from "@src/lib/validators";
import { SIGN_IN_URL, HOME_URL } from "@src/utils/config";

interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
  const router = useRouter();
  const { onOpen, onClose } = useModal();

  const {
    register,
    reset,
    formState: { errors, isValid, isDirty },
    handleSubmit,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    onOpen("loading"); // open loading modal

    const { username, email, password, confirmPassword } = data;

    try {
      // make a post request to register endpoint
      await axios.post("/api/auth/register", {
        username,
        email,
        password,
        confirmPassword,
      });

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res?.ok) throw res?.error;

      reset(); // clear user input user

      router.refresh();
      router.push(HOME_URL);

      toast.success("You are successfully logged in");
    } catch (error: unknown) {
      toast.error("Something went wrong");
    }
    onClose(); // close loading modal
  };

  return (
    <FormController className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Username"
        id="username"
        type="text"
        className="h-10"
        errorMessage={errors.username?.message}
        {...register("username")}
      />
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
      <InputField
        label="Confirm Password"
        id="ConfirmPassword"
        type="password"
        className="h-10"
        errorMessage={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <div>
        <Button
          type="submit"
          className="w-full rounded-full hover:text-base-100"
          variant="primary"
          disabled={!isDirty || !isValid}
        >
          Sign up
        </Button>
      </div>

      <div className="flex gap-2 justify-center text-sm mt-6 px-2 ">
        <div>Already have an account?</div>
        <a className="underline cursor-pointer hover:text-primary" href={SIGN_IN_URL}>
          Login
        </a>
      </div>
    </FormController>
  );
};
export default SignUp;
