import React, { Fragment } from "react";
import Link from "next/link";

import { AiOutlineSearch, AiOutlineBell } from "react-icons/ai";

import { Button, Logo, ProfileMenu, Avatar } from "@src/components/ui";
import AuthButtonGroup from "./AuthButtonGroup";
import MobileMenuButton from "./MobileMenuButton";

import { getCurrentUser } from "@src/lib/server/actions";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = async () => {
  const currentUser = await getCurrentUser();

  return (
    <header className="bg-base-100 fixed inset-x-0 top-0 shadow-md z-50 h-14">
      <div className="w-full max-w-7xl mx-auto h-14 px-4 flex items-center relative gap-2">
        {/* Mobile menu button */}
        <MobileMenuButton />

        <Logo />

        {/* Search form */}
        <div className="mx-2 flex-1 max-w-[420px] md:block hidden">
          <form>
            <div className="flex flex-row flex-wrap w-full relative">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 input input-bordered focus:input-primary px-2 py-[6.5px] h-[2.4rem] focus:border-2"
              />
              <div className="absolute inset-[1px] left-auto pointer-events-none">
                <Button className="px-2 h-9 " variant="ghost">
                  <AiOutlineSearch className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* Right Content */}
        <div className="ml-auto flex items-center h-full gap-2">
          {/* Search icon */}
          <Link href="/" className="btn p-2 mx-2 btn-ghost md:hidden">
            <AiOutlineSearch className="w-6 h-6" />
          </Link>

          <Fragment>
            {currentUser ? (
              <Fragment>
                <Link
                  href="/"
                  className="btn px-[15px] py-2 btn-outline btn-primary md:flex hidden"
                >
                  Create Post
                </Link>

                <Link href="/" className="btn p-2 mx-2 hover:bg-primary/20">
                  <AiOutlineBell className="w-6 h-6" />
                </Link>

                <ProfileMenu user={currentUser}>
                  <Avatar className="w-10 h-10" src={currentUser.image} />
                </ProfileMenu>
              </Fragment>
            ) : (
              <AuthButtonGroup />
            )}
          </Fragment>
        </div>
      </div>
    </header>
  );
};
export default Header;
