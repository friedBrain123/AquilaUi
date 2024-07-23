import {SidebarContext} from "@/App";
import {IconCalendar, IconChefHat, IconClipboard, IconHome, IconIdBadge, IconList, IconMessage, IconNotebook, IconSearch, IconServer, IconUsers, IconX} from "@tabler/icons-react";
import React, {useCallback, useContext, useState} from "react";
import {text} from "stream/consumers";

export default function SidebarSearch() {
    const sidebar = useContext(SidebarContext);
    return (
        <div
            className={`${!sidebar.value ? "translate-x-40" : "-translate-x-80"} top-12  transition-all  border-r border-b rounded-br-lg overflow-hidden border-zinc-300 ease-in-out duration-300 max-lg:absolute  left-0 bg-white w-80 shadow-lg`}
        >
            <div className="flex flex-col divide-y divide-zinc-300">
                <SidebarGroup>
                    <SidebarSearchInput />
                </SidebarGroup>
                <SidebarGroup>
                    <div className="text-zinc-500 p-0 absolute pb-0 -top-3 left-3 bg-white font-semibold">Links</div>
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

function SidebarSearchInput(link: any) {
    const [query, setQuery] = useState("");

    return (
        <div className="flex text-zinc-400 gap-2 p-2 mb-2 hover:bg-zinc-100 rounded-lg hover:text-zinc-500">
            <IconSearch size={28} />
            <input type="text" onChange={(e) => setQuery(e.target.value)} value={query} placeholder="Search..." className="w-full outline-none bg-transparent " />
            <button onClick={() => setQuery("")}>
                <IconX size={20} />
            </button>
        </div>
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
    return <div className="flex p-3 gap-2 relative  flex-col">{props.children}</div>;
}
