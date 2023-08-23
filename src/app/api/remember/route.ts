import bcrypt from "bcrypt";
import { cookies } from "next/headers";

import { signInSchema } from "@src/lib/validators";
import { db } from "@src/lib/server";

export const GET = async () => {
  const cookieStore = cookies();

  const cookieEmail = cookieStore.get("email")?.value;
  const cookieHashPassword = cookieStore.get("password")?.value;

  try {
    const result = await signInSchema.spa({ email: cookieEmail, password: cookieHashPassword });

    if (!result.success) throw new Error("something went wrong");

    const { email, password } = result.data;

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser || !existingUser.password) throw new Error("User does not exists");

    const isCorrectPassword = await bcrypt.compare(password, existingUser.password);

    if (!isCorrectPassword) throw new Error("Password does not correct");

    return Response.json({
      data: {
        email,
        password,
      },
    });
  } catch (error: unknown) {
    return Response.json({
      data: {
        email: "",
        password: "",
      },
    });
  }
};
