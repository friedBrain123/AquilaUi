import React, {Children} from "react";
import SidebarSearchAccent from "./SidebarSeachAccent";
import Navbar from "./Navbar";
import {useQuery} from "@tanstack/react-query";
import {getPendingStatements, getStatements, getSummary} from "@/api/Statement";
import {Table} from "../ui/Table";
import {Toaster} from "../ui/Toaster";
import Sidebar from "./Sidebar";

export default function Layout({children}) {
    // const {data: statements} = useQuery({queryKey: ["statements"], queryFn: getStatements});
    // const {data: pendingStatements} = useQuery({queryKey: ["pendingStatments"], queryFn: getPendingStatements});
    // const {data: summary} = useQuery({queryKey: ["summary"], queryFn: getSummary});

    return (
        <div className="flex w-full min-h-screen">
            <div className="w-full flex flex-col h-full">
                <Navbar />
                <div className="flex h-full w-full ">
                    <Sidebar />
                    <div className="animate-desktopLoad w-full">{children}</div>
                    <Toaster />
                </div>
            </div>
        </div>
    );
}
