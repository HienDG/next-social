"use client";

import React from "react";
import Link from "next/link";
import { IconType } from "react-icons";

import { HOME_URL } from "@src/utils/config";

interface NavItemProps {
  icon: IconType;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label }) => {
  return (
    <li>
      <Link
        href={HOME_URL}
        className="flex items-center py-2 px-4 hover:bg-primary/10 rounded-full gap-3 hover:text-primary hover:underline w-full"
      >
        <Icon className="w-6 h-6" />
        <span>{label}</span>
      </Link>
    </li>
  );
};
export default NavItem;
