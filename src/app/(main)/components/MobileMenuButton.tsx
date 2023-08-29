"use client";

import React from "react";

import { AiOutlineMenu } from "react-icons/ai";

import { Button } from "@src/components/ui";

import { useModal } from "@src/hooks";

interface MobileMenuButtonProps {}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = () => {
  const { onOpen } = useModal();

  return (
    <span className="block md:hidden">
      <Button
        variant="ghost"
        className="p-2 mx-2 hover:bg-primary/20"
        onClick={() => onOpen("menu")}
      >
        <AiOutlineMenu className="w-6 h-6" />
      </Button>
    </span>
  );
};
export default MobileMenuButton;
