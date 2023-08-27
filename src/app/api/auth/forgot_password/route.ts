import { v4 as uuidv4 } from "uuid";

import { db } from "@src/lib/server";
import { forgotPasswordSchema } from "@src/lib/validators";

export const POST = async (request: Request) => {
  try {
    const data = await request.json();

    const result = await forgotPasswordSchema.spa(data);

    if (!result.success) return Response.json({ message: "Invalid data" }, { status: 400 });

    const { email } = result.data;

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return Response.json({ message: "User not exist" }, { status: 400 });

    const resetId = uuidv4();

    return Response.json({
      data: {
        id: resetId,
      },
    });
  } catch (error: unknown) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
