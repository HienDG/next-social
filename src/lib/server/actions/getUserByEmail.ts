import { db } from "@src/lib/server";

const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new Error("User not exist");

    return user;
  } catch (error: unknown) {
    console.error(error);

    return null;
  }
};

export default getUserByEmail;
