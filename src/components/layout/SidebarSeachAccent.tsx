import {SidebarContext} from "@/App";
import {IconCalendar, IconChefHat, IconClipboard, IconHome, IconIdBadge, IconList, IconMessage, IconNotebook, IconSearch, IconServer, IconUsers, IconX} from "@tabler/icons-react";
import React, {useCallback, useContext, useState} from "react";
import {text} from "stream/consumers";

export default function SidebarSearchAccent() {
    const sidebar = useContext(SidebarContext);
    return (
        <div
            className={`${!sidebar.value ? "translate-x-0" : "-translate-x-80"} top-12  transition-all  border-r border-b rounded-br-lg  border-zinc-300 ease-in-out duration-300 max-lg:absolute  left-0 bg-[white] w-80 shadow-lg`}
        >
            <div>
                <div className="flex flex-col w-full divide-y divide-zinc-400">
                    <div className="flex w-full justify-between p-2 pl-3 relative items-center">
                        <div className="font-semibold font-mono text-blue-800">Aquila</div>
                        <button className=" bg-white text-zinc-400 -right-5 z-20 p-2 rounded-lg">
                            <IconX />
                        </button>
                    </div>
                    <SidebarGroup>
                        <SidebarSearchInput />
                    </SidebarGroup>
                </div>
                <div className="flex flex-col divide-y divide-zinc-400">
                    <SidebarGroup>
                        <div className="text-zinc-500 p-0 absolute pb-0 -top-3.5 left-3  font-semibold">Links</div>
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
        <div className="flex text-zinc-400 gap-2 p-2 mb-2 focus-within:bg-zinc-100 rounded-lg hover:text-zinc-500 ">
            <IconSearch size={28} />
            <input type="text" onChange={(e) => setQuery(e.target.value)} value={query} placeholder="Search..." className="w-full outline-none bg-transparent " />
            <button className="peer-focus:text-white text-white " onClick={() => setQuery("")}>
                <IconX size={20} />
            </button>
        </div>
    );
}

function SidebarLinkActive(link: any) {
    return (
        <div className="flex p-2  bg-[#274a89] rounded-lg  gap-2 text-white">
            {link.icon}
            {link.text}
        </div>
    );
}

function SidebarGroup(props) {
    return <div className="flex p-3 gap-2 relative  flex-col">{props.children}</div>;
}
