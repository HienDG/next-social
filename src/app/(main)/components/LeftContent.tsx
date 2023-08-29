"use client";

import React, { Fragment } from "react";
import { useSession } from "next-auth/react";

import { AiFillHome, AiTwotoneTags, AiFillBulb } from "react-icons/ai";
import { BsFillBookmarkFill, BsBookFill } from "react-icons/bs";

import NavItem from "./NavItem";
import AuthCard from "./AuthCard";
import { MenuModal } from "@src/components/modal";

import { useModal } from "@src/hooks";

interface LeftContentProps {}

const LeftContent: React.FC<LeftContentProps> = () => {
  const { data: session } = useSession();
  const { view } = useModal();

  return (
    <aside className="md:block hidden">
      <Fragment>{!session && <AuthCard />}</Fragment>

      <nav>
        <ul className="space-y-2">
          <NavItem icon={AiFillHome} label="Home" />
          <NavItem icon={AiTwotoneTags} label="Tags" />
          <NavItem icon={BsFillBookmarkFill} label="Bookmark" />
          <NavItem icon={AiFillBulb} label="FAQ" />
          <NavItem icon={BsBookFill} label="Guide" />
        </ul>
      </nav>

      {/* mobile Menu  */}
      {view === "menu" && (
        <MenuModal>
          <NavItem icon={AiFillHome} label="Home" />
          <NavItem icon={AiTwotoneTags} label="Tags" />
          <NavItem icon={BsFillBookmarkFill} label="Bookmark" />
          <NavItem icon={AiFillBulb} label="FAQ" />
          <NavItem icon={BsBookFill} label="Guide" />
        </MenuModal>
      )}
    </aside>
  );
};
export default LeftContent;
