"use client";

import React from "react";
import { RecoilRoot } from "recoil";

const RecoilProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	return <RecoilRoot>{children}</RecoilRoot>;
};
export default RecoilProvider;
