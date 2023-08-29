"use client";

import React from "react";
import Link from "next/link";

import { SIGN_IN_URL, SIGN_UP_URL } from "@src/utils/config";

interface AuthCardProps {}

const AuthCard: React.FC<AuthCardProps> = () => {
  return (
    <div className="p-4 bg-base-100 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        DEV Community is a community of 1,129,165 amazing developers
      </h2>
      <p className="mb-4">
        We&apos;re a place where coders share, stay up-to-date and grow their careers.
      </p>
      <div className="join join-vertical w-full gap-3">
        <Link href={SIGN_UP_URL} className="btn btn-outline btn-primary">
          Create account
        </Link>
        <Link href={SIGN_IN_URL} className="btn btn-secondary text-base-100">
          Login
        </Link>
      </div>
    </div>
  );
};
export default AuthCard;
