"use client";

import React from "react";
import { signIn, signOut } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";

import { AiOutlineGoogle, AiOutlineGithub } from "react-icons/ai";

import { Button } from "@src/components/ui";

interface OAuthButtonGroupProps {}

const OAuthButtonGroup: React.FC<OAuthButtonGroupProps> = () => {
	const signInWithProvider = async (provider: BuiltInProviderType) => {
		return await signIn(provider);
	};

	return (
		<div className="join gap-4 join-vertical w-full [&>button]:h-12">
			<Button
				variant="primary"
				className="p-3 hover:text-base-100"
				onClick={() => signInWithProvider("google")}
			>
				<AiOutlineGoogle className="w-6 h-6" />
				<span>Continue With Google</span>
			</Button>

			<Button variant="neutral" className="p-3" onClick={() => signInWithProvider("github")}>
				<AiOutlineGithub className="w-6 h-6" />
				<span>Continue With Github</span>
			</Button>

			<Button variant="error" className="p-3" onClick={() => signOut()}>
				Sign out
			</Button>
		</div>
	);
};
export default OAuthButtonGroup;
