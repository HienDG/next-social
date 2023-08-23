import React from "react";

import OAuthButtonGroup from "./components/OAuthButtonGroup";
import { LoadingModal } from "@src/components/modal";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <section className="text-base mx-auto max-w-7xl w-full grid gap-4 grid-cols-1 p-4">
        <div className="w-[600px] bg-base-100 p-12 mx-auto shadow-lg rounded-lg ring-0">
          <div className="mb-6 w-full text-center space-y-2">
            <h1 className="text-3xl font-bold">Welcome to DEV Community</h1>
            <div>DEV Community is a community of 1,124,401 amazing developers</div>
          </div>

          <div>
            <div>
              <OAuthButtonGroup />
            </div>

            <div className="my-6 relative text-center after:block after:border after:border-solid after:border-[hsl(var(--bc)/0.2)] after:absolute after:top-1/2 after:w-full after:rounded-md">
              <span className="font-semibold bg-base-100 inline-block relative px-4 z-[1]">Or</span>
            </div>

            <div>{children}</div>
          </div>
        </div>
      </section>

      <LoadingModal />
    </div>
  );
};
export default AuthLayout;
