import React from "react";
import {Header, HeaderBtn} from "../layout/Header";
import {IconBadge, IconDotsVertical, IconFolder, IconFolderPlus, IconForms, IconGripVertical, IconLine, IconPackage, IconRobot, IconTemplate} from "@tabler/icons-react";
import {Separator} from "@radix-ui/react-dropdown-menu";
import {NavLink} from "react-router-dom";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger} from "../ui/Dialog";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "../ui/Dropdown";
import {DialogClose, DialogTitle} from "@radix-ui/react-dialog";
import {Input} from "../ui/Input";
import {Button} from "../ui/button";

export const Library = () => {
    const libaryStyles = {};

    const folders = [
        {
            name: "Templates",
            icon: <IconTemplate />,
            created: "2024-7-10",
            size: 12245,
            fileCount: 10,
            files: [{name: "file", size: 10, type: "txt"}],
        },
        {
            name: "Forms",
            icon: <IconForms />,
            created: "2024-7-10",
            size: 12245,
            fileCount: 10,
            files: [{name: "file", size: 10, type: "txt"}],
        },
        {
            name: "Badges",
            icon: <IconBadge />,
            created: "2024-7-10",
            size: 12245,
            fileCount: 10,
            files: [{name: "file", size: 10, type: "txt"}],
        },
        {
            name: "Packages",
            icon: <IconPackage />,
            created: "2024-7-10",
            size: 12245,
            fileCount: 10,
            files: [{name: "file", size: 10, type: "txt"}],
        },
        {
            name: "Autmoations",
            icon: <IconRobot />,
            created: "2024-7-10",
            size: 12245,
            fileCount: 10,
            files: [{name: "file", size: 10, type: "txt"}],
        },
    ];

    return (
        <>
            <Header desktopTitle="Messages/Inbox" desktopSubtitle={" Messages"} mobileTitle="Inbox" mobileSubtitle={" Messages"}>
                <CreateFolder />
            </Header>
            <div className="max-lg:hidden">
                <div>
                    <div className="font-semibold mb-4">Recent folders</div>
                    <div className="grid grid-cols-5 gap-4">
                        {folders.map((x) => {
                            return <Folder {...x} />;
                        })}
                    </div>
                </div>
                <div>
                    <div className="font-semibold mb-4">All folders</div>
                    <div className="grid grid-cols-5 gap-4">
                        {folders.map((x) => {
                            return <Folder {...x} />;
                        })}
                    </div>
                </div>
            </div>
            <div className="px-4 lg:hidden mb-12 ">
                <div className=" flex flex-col divide-y-2 shadow-md border rounded-lg overflow-hidden ">
                    {folders.map((x) => {
                        return <Folder {...x} />;
                    })}
                </div>
            </div>
        </>
    );
};

function Folder(folder) {
    return (
        <>
            <div className="bg-card p-2 rounded-lg border w-full max-lg:hidden">
                <div className="flex items-center gap-2">
                    <div className="bg-red-400 p-1 rounded-lg text-zinc-100">
                        <IconFolder />
                    </div>
                    <div>
                        <NavLink to={`/location/library/${folder.size}`} className="font-semibold">
                            {folder.name}
                        </NavLink>
                        <div className="flex space-x-2">
                            {/* <div>{folder.fileCount} </div> */}
                            <div>{folder.size} MB</div>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="ml-auto">
                            <IconDotsVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Edit Folder</DropdownMenuItem>
                            <DropdownMenuItem>Delete Folder</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <NavLink to={`/location/library/${folder.size}`} className="bg-card w-full lg:hidden p-4">
                <div className="flex items-center gap-4">
                    <div className="bg-red-500 p-1 rounded-lg text-white">{folder.icon}</div>
                    <div>{folder.name}</div>
                </div>
            </NavLink>
        </>
    );
}

function CreateFolder() {
    return (
        <Dialog>
            <DialogTrigger>
                <HeaderBtn icon={<IconFolderPlus />} text="New Folder" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new folder</DialogTitle>
                </DialogHeader>
                <Input />
                <DialogFooter>
                    <DialogClose>
                        <Button variant={"secondary"}>Cancel</Button>
                    </DialogClose>
                    <DialogClose>
                        <Button variant={"destructive"}>Submit</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
