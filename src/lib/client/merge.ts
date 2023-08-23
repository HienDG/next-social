import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// merge Tailwind CSS classes without style conflicts.
export default function merge(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
