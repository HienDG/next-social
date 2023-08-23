import React, { Fragment } from "react";

import Header from "./components/Header";

const layout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<Fragment>
			<Header />
			<main className="mt-14 bg-base-300 min-h-screen">{children}</main>
		</Fragment>
	);
};
export default layout;
