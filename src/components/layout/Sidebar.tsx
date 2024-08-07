import {SidebarContext} from "@/App";
import {IconCalendar, IconChefHat, IconClipboard, IconHome, IconIdBadge, IconList, IconMessage, IconNotebook, IconServer, IconUsers} from "@tabler/icons-react";
import React, {useCallback, useContext} from "react";
import {text} from "stream/consumers";

export default function Sidebar() {
    const sidebar = useContext(SidebarContext);
    return (
        <div
            className={`${!sidebar.value ? "translate-x-0" : "-translate-x-80"} transition-all  border-r border-b rounded-br-lg overflow-hidden border-zinc-300 ease-in-out duration-300 max-lg:absolute top-12 left-0 z-20  bg-white w-80 shadow-lg`}
        >
            <div className="flex flex-col divide-y divide-zinc-300">
                <SidebarGroup>
                    <SidebarLink icon={<IconHome />} text="Home" />
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarLink icon={<IconUsers />} text="Members" />
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarLink icon={<IconMessage />} text="Messages" />
                    <SidebarLink icon={<IconCalendar />} text="Calendar" />
                    <SidebarLinkActive icon={<IconList />} text="Tasks" />
                    <SidebarLink icon={<IconNotebook />} text="Planner" />
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarLink icon={<IconIdBadge />} text="Bookings" />
                    <SidebarLink icon={<IconChefHat />} text="Assessment" />
                    <SidebarLink icon={<IconClipboard />} text="Next Steps" />
                </SidebarGroup>
            </div>
        </div>
    );
}

function SidebarLink(link: any) {
    return (
        <button className="flex text-zinc-400 gap-2 p-2 hover:bg-zinc-100 rounded-lg hover:text-zinc-500">
            {link.icon}
            {link.text}
        </button>
    );
}

function SidebarLinkActive(link: any) {
    return (
        <div className="flex p-2  bg-green-500 rounded-lg  text-white">
            {link.icon}
            {link.text}
        </div>
    );
}

function SidebarGroup(props) {
    return <div className="flex p-2 gap-2  flex-col">{props.children}</div>;
}
