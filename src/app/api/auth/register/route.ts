import bcrypt from "bcrypt";

import { db } from "@src/lib/server";
import { signUpSchema } from "@src/lib/validators";
import { NAME_LIST } from "@src/utils/username_data";

function randName() {
  const firstName = NAME_LIST[Math.floor(Math.random() * NAME_LIST.length)];

  const secondName = NAME_LIST[Math.floor(Math.random() * NAME_LIST.length)];

  if (Math.random() > 0.5) {
    const thirdName = NAME_LIST[Math.floor(Math.random() * NAME_LIST.length)];

    return firstName + secondName + thirdName;
  }

  return firstName + secondName;
}

export const POST = async (request: Request) => {
  try {
    const data = await request.json();

    const result = await signUpSchema.spa(data);

    if (!result.success) {
      return Response.json({ message: "Invalid data" }, { status: 400 });
    }

    const { email, username: name, password } = result.data;

    const salt = await bcrypt.genSalt(12);

    const hashedPassword = await bcrypt.hash(password, salt);

    const username = randName();

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        username,
      },
    });

    return Response.json({ data: newUser });
  } catch (error: unknown) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
