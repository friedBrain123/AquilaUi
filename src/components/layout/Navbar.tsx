import {IconBell, IconChevronLeft, IconGlass, IconMenu, IconMenu2, IconRobot, IconSearch, IconUser} from "@tabler/icons-react";
import React, {useContext, useState} from "react";
import Assistant from "../features/Assistant";
import {SidebarContext} from "@/App";

export default function Navbar() {
    return (
        <div className="w-full flex justify-between items-center bg-green-600 p-2">
            <div className="flex">
                <SidebarBtn>
                    <IconMenu2 />
                </SidebarBtn>
                <NavbarBtn>
                    <IconChevronLeft />
                </NavbarBtn>
                <NavbarSearch />
            </div>
            <div className="flex gap-4">
                <Assistant />
                <NavbarBtn>
                    <IconBell />
                    <div className="px-2 bg-red-500 rounded-full absolute -top-2 -right-1">2</div>
                </NavbarBtn>
                <NavbarBtn>
                    <IconUser />
                </NavbarBtn>
            </div>
        </div>
    );
}

function NavbarBtn(props) {
    return <button className="p-1 active:bg-white/25 relative rounded-lg">{props.children}</button>;
}

function SidebarBtn(props) {
    const sidebar = useContext(SidebarContext);

    return (
        <button onClick={() => sidebar.setValue(!sidebar.value)} className="p-1 active:bg-white/25 relative rounded-lg">
            {props.children}
        </button>
    );
}

function NavbarSearch(props) {
    const [isActive, setActive] = useState(false);

    return (
        <div className="flex gap-2 ">
            <button onClick={() => setActive(true)}>
                <IconSearch />
            </button>
            <input type="text" className={`transition-all duration-200 border-b bg-transparent border-white ${isActive ? "w-full" : "w-0"}`} />
        </div>
    );
}
