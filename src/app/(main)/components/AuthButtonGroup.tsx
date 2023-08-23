"use client";

import React from "react";
import Link from "next/link";

import { SIGN_IN_URL, SIGN_UP_URL } from "@src/utils/config";

const AuthButtonGroup: React.FC = () => {
  return (
    <div className="join gap-2">
      <Link href={SIGN_IN_URL} className="btn md:flex hidden btn-ghost">
        Log in
      </Link>

      <Link href={SIGN_UP_URL} className="btn hover:text-base-100 btn-primary">
        Create account
      </Link>
    </div>
  );
};
export default AuthButtonGroup;
