"use client";

import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { AiOutlineClose } from "react-icons/ai";

import { Button } from "@src/components/ui";

import { useModal } from "@src/hooks";

const MenuModal: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isOpen, onClose } = useModal();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[60]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 z-[60]" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto z-[70]">
          <div>
            <Transition.Child as={Fragment}>
              <Dialog.Panel className="max-w-[300px] w-[90%] bg-base-100 h-screen overflow-y-auto">
                <header className="flex items-center pl-4 pr-2 justify-between h-14">
                  <h2 className="text-xl font-bold">DEV Community</h2>
                  <Button className="!h-fit p-2" variant="ghost" onClick={onClose}>
                    <AiOutlineClose className="w-6 h-6" />
                  </Button>
                </header>

                <div className="p-2">
                  <nav className="mb-4">
                    <ul className="space-y-2">{children}</ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default MenuModal;
