import React from "react";
import { validate as uuidValidate, version as uuidVersion } from "uuid";
import { redirect } from "next/navigation";

import { AiFillLock } from "react-icons/ai";

import ResetForm from "./components/ResetForm";

import { getUserByEmail } from "@src/lib/server/actions";
import { FORGOT_PASSWORD_URL } from "@src/utils/config";

interface ResetPasswordPageProps {
  params: {
    slug: string;
    email: string;
  };
}

const isValidate = (payload: string) => {
  return uuidValidate(payload) && uuidVersion(payload) === 4;
};

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = async ({ params }) => {
  const { slug, email } = params;

  const decodeEmail = decodeURIComponent(email);

  const user = await getUserByEmail(decodeEmail);

  // check if slug id invalid
  // check if user not exist or email invalid
  if (!isValidate(slug) || !user) return redirect(FORGOT_PASSWORD_URL);

  return (
    <div className="text-base mx-auto max-w-7xl w-full p-4 h-screen flex items-center justify-center">
      <section className="w-[600px]  bg-base-100 p-12 mx-auto shadow-lg rounded-lg ring-1 space-y-6">
        <div className="flex items-center justify-center ">
          <AiFillLock className="w-10 h-10 text-primary" />
        </div>

        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">Reset Password </h1>
        </div>

        <div>
          <ResetForm email={decodeEmail} />
        </div>
      </section>
    </div>
  );
};
export default ResetPasswordPage;
