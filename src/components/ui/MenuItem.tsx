"use client";

import React from "react";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { signOut } from "next-auth/react";

import { merge } from "@src/lib/client";

interface MenuItemProps extends React.PropsWithChildren {
  href?: string;
  logout?: boolean;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ children, href = "/", logout = false, className }) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (logout) {
      event.preventDefault();

      signOut().catch((err) => {
        console.error("An Error occurred", err);
      });
    }
  };

  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          href={href}
          onClick={handleClick}
          className={merge(
            "btn w-full justify-start rounded-md px-4 py-2 border-none text-sm",
            className,
            {
              ["btn-primary bg-opacity-80 text-base-100 underline"]: active,
              ["bg-transparent"]: !active,
            },
          )}
        >
          {children}
        </Link>
      )}
    </Menu.Item>
  );
};
export default MenuItem;
