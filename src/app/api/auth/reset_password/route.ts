import bcrypt from "bcrypt";

import { db } from "@src/lib/server";
import { signInSchema } from "@src/lib/validators";

export const PATCH = async (request: Request) => {
  try {
    const data = await request.json();

    const result = await signInSchema.spa(data);

    if (!result.success) return Response.json({ message: "Invalid data" }, { status: 400 });

    const { email, password } = result.data;

    const salt = await bcrypt.genSalt(12);

    const hashedPassword = await bcrypt.hash(password, salt);

    //   FIND USER and update new password

    await db.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });

    return Response.json({ message: "success" });
  } catch (error: unknown) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
