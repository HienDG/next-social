import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import {
  HOME_URL,
  SIGN_IN_URL,
  SIGN_UP_URL,
  FORGOT_PASSWORD_URL,
  RESET_PASSWORD_URL,
} from "@src/utils/config";

const legacyPrefixes = [SIGN_IN_URL, SIGN_UP_URL, FORGOT_PASSWORD_URL, RESET_PASSWORD_URL];

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const token = await getToken({ req: request });

  if (token && legacyPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.redirect(new URL(HOME_URL, request.url));
  }
};

export const config = {
  matcher: [SIGN_IN_URL, SIGN_UP_URL, FORGOT_PASSWORD_URL, `${RESET_PASSWORD_URL}/:path*`],
};
