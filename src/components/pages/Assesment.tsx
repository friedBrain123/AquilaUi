import {getAssesments, prmoteGrade} from "@/api/Assesment";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import React from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/Table";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger} from "../ui/Dropdown";
import {IconDotsVertical, IconLabel, IconMedal, IconMinus, IconPlus} from "@tabler/icons-react";
import {DropdownMenuSub} from "@radix-ui/react-dropdown-menu";

export default function Assesment() {
    const {data: assesments} = useQuery({queryKey: ["assesments"], queryFn: getAssesments});
    const queryClient = useQueryClient();

    const PromoteGrade = useMutation({
        mutationFn: (x) => prmoteGrade(x.programmeId, x.memberId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["assesments"]});
        },
    });

    return (
        <div>
            <div>Assesment</div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {assesments?.map((x) => {
                        const width = `${x.progress * 100}%`;
                        return (
                            <TableRow>
                                <TableCell className="font-medium">{x.member?.firstName}</TableCell>
                                <TableCell className="font-medium">
                                    <div className="p-1" style={{backgroundColor: x.grade.colour}}>
                                        {x.grade?.name}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{x.promoted}</TableCell>
                                <TableCell className="font-medium">{x.attended}</TableCell>
                                <TableCell className="font-medium">
                                    <div className="w-40 h-5 bg-zinc-100 rounded-lg overflow-hidden border border-zinc-300">
                                        <div style={{backgroundColor: x.grade.colour, width: width}} className="h-full"></div>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{x.readyToPromote && <IconLabel />}</TableCell>
                                <TableCell className="font-medium">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <IconDotsVertical />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <button onClick={() => PromoteGrade.mutate({programmeId: x.programme.id, memberId: x.member.id})} className="flex gap-2 items-center">
                                                    Promote
                                                    <IconPlus size={20} />
                                                </button>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <button onClick={() => PromoteGrade.mutate({programmeId: x.programme.id, memberId: x.member.id})} className="flex gap-2 items-center">
                                                    Demote
                                                    <IconMinus size={20} />
                                                </button>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>Billing</DropdownMenuItem>
                                            <DropdownMenuItem>Team</DropdownMenuItem>
                                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                                            <DropdownMenuSub>
                                                <DropdownMenuSubTrigger>Subscription</DropdownMenuSubTrigger>
                                                <DropdownMenuSubContent>
                                                    <DropdownMenuItem>Billing</DropdownMenuItem>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuSub>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
