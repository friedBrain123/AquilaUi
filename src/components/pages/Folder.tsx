import {IconDotsVertical, IconFile, IconFilePlus, IconFolder} from "@tabler/icons-react";
import React, {useState} from "react";
import {Header, HeaderBtn} from "../layout/Header";
import {Separator} from "../ui/Seperator";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem} from "../ui/Dropdown";
import {DropdownMenuTrigger} from "@radix-ui/react-dropdown-menu";
import {Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger} from "../ui/Drawer";
import {Button} from "../ui/button";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger} from "../ui/Dialog";
import {Input} from "../ui/Input";
import {DialogDescription, DialogTitle} from "@radix-ui/react-dialog";

export const Folder = () => {
    const folder = {
        name: "folderName",
        created: "2024-7-10",
        size: 12245,
        fileCount: 10,
        files: [
            {name: "file", size: 10, create: "2024-9,9"},
            {name: "file", size: 10, create: "2024-9,9"},
            {name: "file", size: 10, create: "2024-9,9"},
            {name: "file", size: 10, create: "2024-9,9"},
            {name: "file", size: 10, create: "2024-9,9"},
        ],
    };

    return (
        <>
            <Header desktopTitle={folder.name + ""} desktopSubtitle={folder.fileCount + " Files"} mobileTitle={folder.name + ""} mobileSubtitle={folder.fileCount + " Files"}>
                <UplodaFile />
            </Header>
            <div className="grid grid-cols-5 gap-4 max-lg:hidden">
                {folder.files.map((x) => {
                    return <File {...x} />;
                })}
            </div>
            <div className="p-4 pt-0">
                <div className="flex flex-col lg:hidden border-x border-b rounded-lg overflow-hidden divide-y">
                    {folder.files.map((x) => {
                        return <File {...x} />;
                    })}
                </div>
            </div>
        </>
    );
};

function File(folder) {
    const [renameFile, setRenameFile] = useState(false);
    const [deleteFile, setDeleteFile] = useState(false);

    return (
        <>
            <div className="bg-card  border p-4 rounded-lg w-full max-lg:hidden">
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-red-500 rounded-lg p-1 text-zinc-100">
                            <IconFile />
                        </div>
                        <div className="font-semibold">{folder.name}</div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="max-lg:hidden">
                            <IconDotsVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onSelect={() => setRenameFile(true)}>Rename File</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setDeleteFile(true)}>Delete File</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="bg-card  p-4 w-full lg:hidden">
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-red-500 rounded-lg p-1 text-zinc-100">
                            <IconFile />
                        </div>
                        <div className="font-semibold">{folder.name}</div>
                    </div>
                    <Drawer>
                        <DrawerTrigger className="lg:hidden">
                            <IconDotsVertical />
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <Button variant={"secondary"} onClick={() => setRenameFile(true)}>
                                    Rename File
                                </Button>
                                <Button variant={"destructive"} onClick={() => setDeleteFile(true)}>
                                    Delete File
                                </Button>
                            </DrawerHeader>
                        </DrawerContent>
                    </Drawer>
                </div>
                <div className="flex justify-between w-full py-2">
                    <div>Created</div>
                    <div>{folder.create}</div>
                </div>
            </div>

            <RenameFile open={renameFile} onClose={() => setRenameFile(false)} />
            <DeleteFile open={deleteFile} onClose={() => setRenameFile(false)} />
        </>
    );
}

function UplodaFile() {
    return <HeaderBtn icon={<IconFilePlus />} text="Upload File" />;
}

function RenameFile({open, onClose}) {
    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Rename File</DialogTitle>
                </DialogHeader>
                <Input />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={onClose} variant={"secondary"}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button variant={"destructive"}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function DeleteFile({open, onClose}) {
    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete File</DialogTitle>
                    <DialogDescription>Are you sure that you want to delete this file?</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={onClose} variant={"secondary"}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button variant={"destructive"}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
