"use client";

import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import type { User } from "@prisma/client";

import MenuItem from "./MenuItem";

interface ProfileMenuProps extends React.PropsWithChildren {
  user: User;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ children, user }) => {
  return (
    <div className="h-full flex items-center">
      <Menu as="div" className="relative inline-block text-left">
        <div className="flex items-center h-full justify-center">
          <Menu.Button>{children}</Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-base-300 rounded-md bg-base-100 shadow-lg ring-1 ring-neutral ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <MenuItem className="!h-14">
                <div className="flex flex-col">
                  <span>{user.username}</span>
                  <small>@{user.name}</small>
                </div>
              </MenuItem>
            </div>
            <div className="px-1 py-1 my-1">
              <MenuItem>DashBoard</MenuItem>
              <MenuItem>Create Post</MenuItem>
              <MenuItem>Bookmark</MenuItem>
              <MenuItem>Setting</MenuItem>
            </div>
            <div className="px-1 py-1">
              <MenuItem logout>Sign out</MenuItem>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
