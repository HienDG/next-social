"use client";

import React from "react";
import Image from "next/image";

import { merge } from "@src/lib/client";

interface AvatarProps {
	className?: string;
	src?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ className, src }) => {
	return (
		<div className={merge("h-8 w-8", className)}>
			<Image
				src={src || "/images/user_placeholder.jpg"}
				alt="avatar"
				width={100}
				height={100}
				className="w-full h-full rounded-full"
			/>
		</div>
	);
};
export default Avatar;
