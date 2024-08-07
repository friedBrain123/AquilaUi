import {Description} from "@radix-ui/react-dialog";
import React, {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/Card";
import {Header, HeaderBtn} from "../layout/Header";
import {IconDotsVertical, IconPlus} from "@tabler/icons-react";
import {Divide} from "lucide-react";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "../ui/Dialog";
import {Input} from "../ui/Input";
import {Button} from "../ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "../ui/Dropdown";
import {Progress} from "../ui/Progress";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "../ui/Tooltip";

export const Planner = () => {
    const plans = [
        {id: 1, date: "2024-5-25", topic: "today", description: "how are you doing?", user: "oliver pocock"},
        {id: 2, date: "2024-5-25", topic: "today", description: "how are you doing?", user: "oliver pocock"},
    ];
    const week = ["2024-5-23", "2024-5-24", "2024-5-25", "2024-5-26", "2024-5-27"];

    const [isEditDialog, setIsEditDialog] = useState(false);
    const [isDeletetDialog, setIsDeletetDialog] = useState(false);

    const [currentPlans, setCurrentPlans] = useState(plans);
    return (
        <div>
            <Header desktopTitle="Planner" desktopSubtitle={new Date().toDateString()} mobileTitle="Planner" mobileSubtitle={new Date().toDateString()}>
                <CreateActivity />
            </Header>

            <div className="flex flex-col gap-4 max-lg:px-4 ">
                {week.map((x) => {
                    return (
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{x}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {currentPlans
                                    .filter((y) => y.date == x)
                                    .map((y) => {
                                        return (
                                            <div className="flex items-center gap-4 my-2">
                                                <div>{y.user}</div>
                                                <div>{y.date}</div>
                                                <div className="ml-auto bg-slate-500/25 p-2 rounded-lg">{y.topic}</div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger>
                                                        <IconDotsVertical />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuItem onSelect={() => setIsEditDialog(true)}>Edit</DropdownMenuItem>
                                                        <DropdownMenuItem onSelect={() => setCurrentPlans(currentPlans.filter((x) => x.id !== y.id))}>Delete</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        );
                                    })}
                                {currentPlans.filter((y) => y.date == x).length == 0 && <div>There are no plans toay</div>}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
            <EditActivty open={isEditDialog} />
            <DeleteActivty open={isDeletetDialog} />
        </div>
    );
};

function CreateActivity() {
    return (
        <Dialog>
            <DialogTrigger>
                <HeaderBtn icon={<IconPlus />} text="New Activity" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create an Activity</DialogTitle>
                </DialogHeader>
                <Input />
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

function EditActivty({open}) {
    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Activity</DialogTitle>
                    <DialogFooter>
                        <DialogClose>
                            <Button variant={"secondary"}>Cancel</Button>
                        </DialogClose>
                        <DialogClose>
                            <Button variant={"destructive"}>Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

function DeleteActivty({open}) {
    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Activity</DialogTitle>
                    <DialogFooter>
                        <DialogClose>
                            <Button variant={"secondary"}>Cancel</Button>
                        </DialogClose>
                        <DialogClose>
                            <Button variant={"destructive"}>Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
