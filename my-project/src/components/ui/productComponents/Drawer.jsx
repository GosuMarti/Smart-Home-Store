import React from "react";
import SideBarFilter from "./SideBarFilter";

const Drawer = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center"></div>
      <div className="drawer-side h-full">
        <ul className="p-4 w-80 hover:bg-transparent border-none">
          <div className="text-black  font-medium ml-3">
            <SideBarFilter title="Place">Kitchen</SideBarFilter>
            <SideBarFilter title="Shop By Price">
              <li>
                <a href="#">Submenu Item 1</a>
              </li>
              <li>
                <a href="#">Submenu Item 2</a>
              </li>
            </SideBarFilter>
            <SideBarFilter title="Sale & Price">
              <li>
                <a href="#">Submenu Item 1</a>
              </li>
              <li>
                <a href="#">Submenu Item 2</a>
              </li>
            </SideBarFilter>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
