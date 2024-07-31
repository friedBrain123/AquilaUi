import React, {useState} from "react";
import {DropdownMenuContent, DropdownMenu, DropdownMenuSubTrigger, DropdownMenuItem, DropdownMenuSubContent, DropdownMenuPortal, DropdownMenuSeparator} from "../ui/Dropdown";
import {DropdownMenuSub, DropdownMenuTrigger} from "@radix-ui/react-dropdown-menu";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "../ui/Dialog";
import {Input} from "../ui/Input";
import {Button} from "../ui/button";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "../ui/Table";
import {useQuery} from "@tanstack/react-query";
import {getmembers} from "@/api/Assesment";
import {IconArrowRight, IconChevronRight, IconTrash} from "@tabler/icons-react";

export default function TableDiaglog() {
    const {data: members} = useQuery({queryKey: ["members"], queryFn: () => getmembers()});
    const [menu, setMenu] = useState("");
    const [member, setMember] = useState(false);

    const [headers, setHeaders] = useState(["id", "name"]);

    const updateHeaderAtIndex = (index, newObject) => {
        setHeaders((prevHeaders) => {
            // Create a copy of the current headers array
            const updatedHeaders = [...prevHeaders];
            // Replace the object at the specified index
            updatedHeaders[index] = newObject;
            // Return the new array to set the state
            return updatedHeaders;
        });
    };

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">
                            <div className="flex items-center">
                                <button className="font-semibold h-full align-middle">{headers[0]}</button>
                                <HeaderFilter onFilter={(x) => updateHeaderAtIndex(0, x)} />
                            </div>
                        </TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {members?.map((x) => {
                        return (
                            <TableRow>
                                <TableCell className="font-medium whitespace-nowrap">{x[headers[0]]}</TableCell>
                                <TableCell className="font-medium whitespace-nowrap">{x[headers[1]]}</TableCell>
                                <TableCell>Credit Card</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>open</DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem
                                                onSelect={() => {
                                                    setMember(x);
                                                    setMenu("delete");
                                                }}
                                            >
                                                <div className="flex gap-2 items-center">
                                                    Delete <IconTrash />
                                                </div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onSelect={() => {
                                                    setMenu("edit");
                                                    setMember(x);
                                                }}
                                            >
                                                Edit
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>

            <Delete member={member} open={menu == "delete"} handler={() => setMenu("")} />
            <Edit open={menu == "edit"} handler={() => setMenu("")} />
        </>
    );
}

function Edit({open, handler}) {
    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        {/* <Label htmlFor="name" className="text-right">
                            Name
                        </Label> */}
                        <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        {/* <Label htmlFor="username" className="text-right">
                            Username
                        </Label> */}
                        <Input id="username" defaultValue="@peduarte" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => handler()} type="submit" variant="secondary">
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function Delete({open, handler, member}) {
    return (
        <Dialog open={open}>
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete profile {member.name}</DialogTitle>
                    <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={() => handler()} type="submit">
                        Cancel
                    </Button>
                    <Button onClick={() => handler()} type="submit" variant="destructive">
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function HeaderFilter({onFilter}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <IconChevronRight size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Profile</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem onSelect={() => onFilter("name")}>Reference</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => onFilter("id")}>Gender</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => onFilter("id")}>Age</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => onFilter("id")}>Birthday</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => onFilter("id")}>Group</DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Custom Properties</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem onSelect={() => onFilter("name")}>Hieght </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => onFilter("id")}>wieght</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => onFilter("id")}>Bought </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => onFilter("id")}>Birthday</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => onFilter("id")}>Group</DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
