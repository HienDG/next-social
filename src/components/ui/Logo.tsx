"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { merge } from "@src/lib/client";
import { HOME_URL } from "@src/utils/config";

interface LogoProps {
	className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
	return (
		<div>
			<Link href={HOME_URL} className={merge("w-[50px] h-10 block", className)}>
				<Image
					src="/images/logo.png"
					alt="logo"
					className="w-full h-full"
					width={100}
					height={100}
				/>
			</Link>
		</div>
	);
};
export default Logo;
