import {IconBell, IconChevronLeft, IconGlass, IconMenu, IconMenu2, IconRobot, IconSearch, IconUser} from "@tabler/icons-react";
import React, {useContext, useState} from "react";
import Assistant from "../features/Assistant";
import {SidebarContext} from "@/App";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/PopOver";
import {Button} from "../ui/button";
import {Separator} from "../ui/Seperator";

export default function Navbar() {
    return (
        <div className="w-full flex justify-between items-center bg-themered p-2">
            <div className="flex text-zinc-200">
                <SidebarBtn>
                    <IconMenu2 />
                </SidebarBtn>
                <NavbarBtn>
                    <IconChevronLeft />
                </NavbarBtn>
                <NavbarSearch />
            </div>
            <div className="flex gap-4 text-zinc-200">
                <Assistant />
                <NavbarBtn>
                    <IconBell />
                    <div className="px-2 bg-red-500 rounded-full absolute -top-2 -right-1">2</div>
                </NavbarBtn>
                <NavbarBtn>
                    <Popover>
                        <PopoverTrigger>
                            <IconUser />
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="grid gap-4  ">
                                <div className="space-y-2 text-center">
                                    <h4 className="font-medium leading-none">Oliver Pocock</h4>
                                    <p className="text-sm text-muted-foreground">Demo Martial Arts Academy</p>
                                    <Button variant={"secondary"}>Manage Account</Button>
                                </div>
                                <Separator />
                                <div className="grid gap-2">
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Button variant={"secondary"}>Demo Martial Arts 1</Button>
                                    </div>
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Button variant={"secondary"}>Demo Martial Arts 2</Button>
                                    </div>
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Button variant={"secondary"}>Demo Martial Arts 3</Button>
                                    </div>
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Button variant={"secondary"}>Demo Martial Arts 4</Button>
                                    </div>
                                </div>
                                <Separator />
                                <div className="grid gap-2">
                                    <Button variant={"secondary"}>Sign Out</Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
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
