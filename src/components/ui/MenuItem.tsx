import React from "react";
import { Menu } from "@headlessui/react";

import Button from "./Button";

import { merge } from "@src/lib/client";

interface MenuItemProps extends React.PropsWithChildren {}

const MenuItem: React.FC<MenuItemProps> = ({ children }) => {
	return (
		<Menu.Item>
			{({ active }) => (
				<Button
					className={merge("w-full justify-start rounded-md px-4 py-2 border-none text-sm", {
						["btn-primary bg-opacity-80 text-base-100 underline"]: active,
						["bg-transparent"]: !active,
					})}
				>
					{children}
				</Button>
			)}
		</Menu.Item>
	);
};
export default MenuItem;
