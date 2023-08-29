import React from "react";

import LeftContent from "./LeftContent";

const Sidebar: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full max-w-7xl mx-auto grid lg:p-4 gap-4 lg:grid-cols-[240px_2fr_1fr] md:grid-cols-[2fr_5fr] grid-cols-1 p-2">
      <LeftContent />
      <div>{children}</div>
      <div className="lg:block hidden"></div>
    </div>
  );
};
export default Sidebar;
