import { getServerSession } from "next-auth";

import { authOptions } from "@src/lib/server";
import { db } from "@src/lib/server";

const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    // check if user not logged in
    if (!session?.user?.email) throw new Error("User does not logged in");

    // find user by email
    const currentUser = await db.user.findUnique({
      where: {
        email: session.user?.email,
      },
    });

    // check if current user not exist
    if (!currentUser) throw new Error("User not exist");

    // hide password
    currentUser.password = null;

    return currentUser;
  } catch (error: unknown) {
    return null;
  }
};

export default getCurrentUser;
