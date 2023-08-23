"use client";

import React, { forwardRef } from "react";

import { merge } from "@src/lib/client";

type ButtonVariant =
	| "neutral"
	| "primary"
	| "secondary"
	| "accent"
	| "info"
	| "success"
	| "warning"
	| "error"
	| "ghost";

interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		React.PropsWithChildren {
	variant?: ButtonVariant;
	outline?: boolean;
}

// eslint-disable-next-line react/display-name
const Button: React.FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const { children, className, variant, outline = false, ...restProps } = props;

	return (
		<button
			className={merge("btn", className, {
				["btn-outline"]: outline,
				["btn-primary"]: variant === "primary",
				["btn-secondary"]: variant === "secondary",
				["btn-neutral"]: variant === "neutral",
				["btn-accent"]: variant === "accent",
				["btn-info"]: variant === "info",
				["btn-success"]: variant === "success",
				["btn-warning"]: variant === "warning",
				["btn-error"]: variant === "error",
				["btn-ghost"]: variant === "ghost",
			})}
			ref={ref}
			{...restProps}
		>
			{children}
		</button>
	);
});
export default Button;
