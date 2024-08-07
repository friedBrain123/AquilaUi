import {assignGrade, getAssesments, getProgrammes, prmoteGrade} from "@/api/Assesment";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import React from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/Table";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger} from "../ui/Dropdown";
import {IconDotsVertical, IconLabel, IconMedal, IconMinus, IconPlus} from "@tabler/icons-react";
import {DropdownMenuSub} from "@radix-ui/react-dropdown-menu";

export default function Programme() {
    const {data: programmes} = useQuery({queryKey: ["programmes"], queryFn: getProgrammes});
    const queryClient = useQueryClient();

    const PromoteGrade = useMutation({
        mutationFn: (x) => prmoteGrade(x.programmeId, x.memberId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["assesments"]});
        },
    });

    const AssignGrade = useMutation({
        mutationFn: (x) => assignGrade(x.programmeId, x.memberId, x.gradeId),
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
                    {programmes?.map((x) => {
                        const width = `${x.progress * 100}%`;
                        return (
                            <TableRow>
                                <TableCell className="font-medium">{x.name}</TableCell>
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
                                            <DropdownMenuItem>
                                                <button
                                                    onClick={() => AssignGrade.mutate({programmeId: x.programme.id, memberId: x.member.id, gradeId: "c98bc0f2-deea-499b-9096-923482efdb71"})}
                                                    className="flex gap-2 items-center"
                                                >
                                                    Assign grade
                                                    <IconMinus size={20} />
                                                </button>
                                            </DropdownMenuItem>
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
