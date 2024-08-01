"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {ArrowUpDown, ChevronDown, MoreHorizontal} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/Checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/Dropdown";
import {Input} from "@/components/ui/Input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/Table";
import {getmembers} from "@/api/Assesment";
import {useQuery} from "@tanstack/react-query";
import {IconChevronDown, IconChevronUp, IconDotsVertical, IconMail, IconUser} from "@tabler/icons-react";
import {DialogHeader, Dialog, DialogContent, DialogDescription, DialogFooter} from "../ui/Dialog";
import {DialogOverlay, DialogTitle, DialogTrigger} from "@radix-ui/react-dialog";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "../ui/HoverCard";

export type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
};

const propertyOptions = [
    {id: "Profile", properties: ["reference", "dob", "gender", "age", "birthday", "groups", "keyperson", "campaign", "referrer", "notes", "diet", "allergies", "medical", "MediaConsent"]},
    {id: "Custom Properties", properties: ["custom_property_1", "custom_property_2", "custom_property_3", "custom_property_4", "custom_property_5"]},
    {id: "Contract", properties: ["contactFirstName", "eMail", "custom_property_3", "telephoneMobile"]},
    {
        id: "Enrollment",
        properties: ["registedOn", "enrolledOn", "expiredOn", "attended", "EnrolmentReference", "EnrolmentRank", "LicenceNumber", "licenceExpiryDate", "SessionCredits", "SessionCreditsExpire"],
    },
    {id: "Subscritpion", properties: ["status", "SubscriptionExpires", "Mandate", "creditCard", "creditCardExpires", "NextInvoiceDate", "overdueBalance"]},
    {id: "Assment", properties: ["Programme", "grade", "Attendance", "AttendanceTotal", "LastMemberObservationDate", "TotalObservations", "TotalMemberObservations"]},
];

//* TRY REACT KEYBIND e.g hold control and left user in the table to select them
export function DataTableDemo() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [headerProperties, setHeaderProperties] = React.useState({
        colum1: "lastName",
        colum2: "reference",
        colum3: "contact",
        colum4: "mandate",
        colum5: "status",
        colum6: "SubscriptionExpires",
        colum7: "overdueBalance",
        colum8: "telephoneMobile",
        colum9: "SubscriptionExpires",
    });

    const {data: data} = useQuery({queryKey: ["members"], queryFn: () => getmembers()});

    const columns: ColumnDef<Payment>[] = [
        {
            id: "select",
            header: ({table}) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({row}) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
            enableSorting: false,
            enableHiding: false,
        },
        {
            id: "name",
            accessorKey: headerProperties.colum1,
            header: ({column}) => (
                <button className="capitalize hover:underline" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    {headerProperties.colum1}
                </button>
            ),
            cell: ({row}) => <PreviewMember member={row.original} />,
        },

        {
            accessorKey: headerProperties.colum2,
            header: ({column}) => (
                <div className="max-2xl:hidden flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="capitalize hover:underline">{headerProperties.colum2}</button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {propertyOptions.map((option) => (
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>{option.id}</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            {option.properties.map((x) => {
                                                return (
                                                    <DropdownMenuItem
                                                        disabled={
                                                            headerProperties.colum2 == x ||
                                                            headerProperties.colum3 == x ||
                                                            headerProperties.colum4 == x ||
                                                            headerProperties.colum5 == x ||
                                                            headerProperties.colum6 == x ||
                                                            headerProperties.colum7 == x ||
                                                            headerProperties.colum8 == x
                                                        }
                                                        onClick={() =>
                                                            setHeaderProperties((prev) => ({
                                                                ...prev,
                                                                colum2: x,
                                                            }))
                                                        }
                                                    >
                                                        {x}
                                                    </DropdownMenuItem>
                                                );
                                            })}
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>{column.getIsSorted() == "desc" ? <IconChevronUp /> : <IconChevronDown />}</button>
                </div>
            ),
            cell: ({row}) => <div className="capitalize">{row.getValue(headerProperties.colum2)}</div>,
        },
        {
            accessorKey: headerProperties.colum3,
            header: ({column}) => (
                <div className="max-2xl:hidden flex items-center gap-2">
                    <button className="capitalize hover:underline" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        {headerProperties.colum3}
                    </button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button>
                                <ChevronDown className="ml-2 h-4 " />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {propertyOptions.map((option) => (
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>{option.id}</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            {option.properties.map((x) => {
                                                return (
                                                    <DropdownMenuItem
                                                        disabled={
                                                            headerProperties.colum2 == x ||
                                                            headerProperties.colum3 == x ||
                                                            headerProperties.colum4 == x ||
                                                            headerProperties.colum5 == x ||
                                                            headerProperties.colum6 == x ||
                                                            headerProperties.colum7 == x ||
                                                            headerProperties.colum8 == x
                                                        }
                                                        onClick={() =>
                                                            setHeaderProperties((prev) => ({
                                                                ...prev,
                                                                colum3: x,
                                                            }))
                                                        }
                                                    >
                                                        {x}
                                                    </DropdownMenuItem>
                                                );
                                            })}
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ),
            cell: ({row}) => <div className="capitalize max-2xl:hidden">{row.getValue(headerProperties.colum3)}</div>,
        },
        {
            accessorKey: headerProperties.colum4,
            header: ({column}) => (
                <div className="max-2xl:hidden flex items-center">
                    <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>{headerProperties.colum4}</button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button>
                                <ChevronDown className="ml-2 h-4 " />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {propertyOptions.map((option) => (
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>{option.id}</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            {option.properties.map((x) => {
                                                return (
                                                    <DropdownMenuItem
                                                        disabled={
                                                            headerProperties.colum2 == x ||
                                                            headerProperties.colum3 == x ||
                                                            headerProperties.colum4 == x ||
                                                            headerProperties.colum5 == x ||
                                                            headerProperties.colum6 == x ||
                                                            headerProperties.colum7 == x ||
                                                            headerProperties.colum8 == x
                                                        }
                                                        onClick={() =>
                                                            setHeaderProperties((prev) => ({
                                                                ...prev,
                                                                colum4: x,
                                                            }))
                                                        }
                                                    >
                                                        {x}
                                                    </DropdownMenuItem>
                                                );
                                            })}
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ),
            cell: ({row}) => <div className="capitalize max-2xl:hidden">{row.getValue(headerProperties.colum4)}</div>,
        },
        {
            accessorKey: headerProperties.colum5,
            header: ({column}) => (
                <div className="max-2xl:hidden flex items-center">
                    <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>{headerProperties.colum5}</button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button>
                                <ChevronDown className="ml-2 h-4 " />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {propertyOptions.map((option) => (
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>{option.id}</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            {option.properties.map((x) => {
                                                return (
                                                    <DropdownMenuItem
                                                        disabled={
                                                            headerProperties.colum2 == x ||
                                                            headerProperties.colum3 == x ||
                                                            headerProperties.colum4 == x ||
                                                            headerProperties.colum5 == x ||
                                                            headerProperties.colum6 == x ||
                                                            headerProperties.colum7 == x ||
                                                            headerProperties.colum8 == x
                                                        }
                                                        onClick={() =>
                                                            setHeaderProperties((prev) => ({
                                                                ...prev,
                                                                colum5: x,
                                                            }))
                                                        }
                                                    >
                                                        {x}
                                                    </DropdownMenuItem>
                                                );
                                            })}
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ),
            cell: ({row}) => <div className="capitalize max-2xl:hidden">{row.getValue(headerProperties.colum5)}</div>,
        },
        {
            accessorKey: headerProperties.colum7,
            header: ({column}) => (
                <div className="flex items-center">
                    <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>{headerProperties.colum7}</button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button>
                                <ChevronDown className="ml-2 h-4 " />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {propertyOptions.map((option) => (
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>{option.id}</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            {option.properties.map((x) => {
                                                return (
                                                    <DropdownMenuItem
                                                        disabled={
                                                            headerProperties.colum2 == x ||
                                                            headerProperties.colum3 == x ||
                                                            headerProperties.colum4 == x ||
                                                            headerProperties.colum5 == x ||
                                                            headerProperties.colum6 == x ||
                                                            headerProperties.colum7 == x ||
                                                            headerProperties.colum8 == x
                                                        }
                                                        onClick={() =>
                                                            setHeaderProperties((prev) => ({
                                                                ...prev,
                                                                colum7: x,
                                                            }))
                                                        }
                                                    >
                                                        {x}
                                                    </DropdownMenuItem>
                                                );
                                            })}
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ),
            cell: ({row}) => <div className="capitalize">{row.getValue(headerProperties.colum7)}</div>,
        },
        {
            accessorKey: headerProperties.colum8,
            header: ({column}) => (
                <div className="flex items-center">
                    <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>{headerProperties.colum8}</button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button>
                                <ChevronDown className="ml-2 h-4 " />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {propertyOptions.map((option) => (
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>{option.id}</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            {option.properties.map((x) => {
                                                return (
                                                    <DropdownMenuItem
                                                        disabled={
                                                            headerProperties.colum2 == x ||
                                                            headerProperties.colum3 == x ||
                                                            headerProperties.colum4 == x ||
                                                            headerProperties.colum5 == x ||
                                                            headerProperties.colum6 == x ||
                                                            headerProperties.colum7 == x ||
                                                            headerProperties.colum8 == x
                                                        }
                                                        onClick={() =>
                                                            setHeaderProperties((prev) => ({
                                                                ...prev,
                                                                colum8: x,
                                                            }))
                                                        }
                                                    >
                                                        {x}
                                                    </DropdownMenuItem>
                                                );
                                            })}
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ),
            cell: ({row}) => <div className="capitalize">{row.getValue(headerProperties.colum8)}</div>,
        },
        {
            accessorKey: headerProperties.colum9,
            header: ({column}) => (
                <div className="flex items-center">
                    <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>{headerProperties.colum9}</button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button>
                                <ChevronDown className="ml-2 h-4 " />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {propertyOptions.map((option) => (
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>{option.id}</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            {option.properties.map((x) => {
                                                return (
                                                    <DropdownMenuItem
                                                        disabled={
                                                            headerProperties.colum2 == x ||
                                                            headerProperties.colum3 == x ||
                                                            headerProperties.colum4 == x ||
                                                            headerProperties.colum5 == x ||
                                                            headerProperties.colum6 == x ||
                                                            headerProperties.colum7 == x ||
                                                            headerProperties.colum8 == x
                                                        }
                                                        onClick={() =>
                                                            setHeaderProperties((prev) => ({
                                                                ...prev,
                                                                colum9: x,
                                                            }))
                                                        }
                                                    >
                                                        {x}
                                                    </DropdownMenuItem>
                                                );
                                            })}
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ),
            cell: ({row}) => <div className="capitalize">{row.getValue(headerProperties.colum9)}</div>,
        },
        {
            id: "actions",
            enableHiding: false,
            header: ({table}) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>Copy payment ID</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View customer</DropdownMenuItem>
                            <DropdownMenuItem>View payment details</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
            cell: ({row}) => {
                const payment = row.original;

                return <ActionMenu />;
            },
        },
    ];

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full overflow-hidden">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter emails..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                {data != null && (
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
}

function ActionMenu() {
    const [isDialog, setDialog] = React.useState(null);
    const [photography, setphtography] = React.useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button>
                        <IconDotsVertical />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem></DropdownMenuItem>
                    <DropdownMenuItem>Compose SMS</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Write in the journal</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDialog(2)}>Make Observation</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Edit records</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={() => setDialog(1)}>Update Profile Note</DropdownMenuItem>
                                <DropdownMenuItem>Update Height</DropdownMenuItem>
                                <DropdownMenuItem>Update Weight</DropdownMenuItem>
                                <DropdownMenuItem>Update Bought Kit</DropdownMenuItem>
                                <DropdownMenuItem>Update On Trial?</DropdownMenuItem>
                                <DropdownMenuItem>Update Target Grade</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked={photography} onCheckedChange={setphtography}>
                                    Status Bar
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Add to group</DropdownMenuItem>
                                <DropdownMenuItem>Remove from group</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Assign key person</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Edit Enrollment</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Enroll Member</DropdownMenuItem>
                                <DropdownMenuItem>Un-Enroll Member</DropdownMenuItem>
                                <DropdownMenuItem>Update License Expiry Date</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Remove from group</DropdownMenuItem>
                                <DropdownMenuItem>Assign key person</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>Invite to portal</DropdownMenuItem>
                    <DropdownMenuItem>Request a form</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Exprot Record</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <EditRecord onClose={() => setDialog(null)} memberId={undefined} property={"Height"} open={isDialog} />
            <MakeObservation onClose={() => setDialog(null)} memberId={undefined} property={"Height"} open={isDialog} />
        </>
    );
}

function EditRecord({memberId, property, open, onClose}) {
    return (
        <Dialog open={open == 1}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit {property}</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <Input />
                </DialogDescription>
                <DialogFooter>
                    <Button onClick={onClose} variant="secondary">
                        Cancel
                    </Button>
                    <Button onClick={onClose} variant="default">
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

type ObservationType = {
    property: string;
    open: number;
    onClose: () => void;
};

function MakeObservation({property, open, onClose}: ObservationType) {
    return (
        <Dialog open={open == 2}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit {property}</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <Input />
                    <Gallery />
                </DialogDescription>
                <DialogFooter>
                    <Button onClick={onClose} variant="secondary">
                        Cancel
                    </Button>
                    <Button onClick={onClose} variant="default">
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// const [light, setLight] = React.useState(false);

// type switchType = {
//     activeLight: () => void;
// };

// function Switch({activeLight}: switchType) {
//     return <button onClick={activeLight}></button>;
// }

// <Switch activeLight={() => setLight(!light)} />;

function Gallery() {
    return (
        <Dialog>
            <DialogTrigger>Gallery</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Gallery</DialogTitle>
                </DialogHeader>
                <div className="w-full grid grid-flow-row grid-cols-4">
                    <div className="w-10 h-10 bg-red-500"></div>
                    <div className="w-10 h-10 bg-red-500"></div>
                    <div className="w-10 h-10 bg-red-500"></div>
                    <div className="w-10 h-10 bg-red-500"></div>
                    <div className="w-10 h-10 bg-red-500"></div>
                    <div className="w-10 h-10 bg-red-500"></div>
                    <div className="w-10 h-10 bg-red-500"></div>
                    <div className="w-10 h-10 bg-red-500"></div>
                    <div className="w-10 h-10 bg-red-500"></div>
                    <div className="w-10 h-10 bg-red-500"></div>
                    <div className="w-10 h-10 bg-red-500"></div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function PreviewMember({member}) {
    return (
        <HoverCard>
            <HoverCardTrigger className="hover:cursor-pointer">
                <div className="flex gap-4 w-fit">
                    <img src={member.thumbnailURL} className="w-8 h-8 rounded-full" />
                    <div>
                        <div className="whitespace-nowrap hover:underline">{member.firstName + " " + member.lastName}</div>
                        <div>{member.status}</div>
                    </div>
                </div>
            </HoverCardTrigger>
            <HoverCardContent>
                <div className="flex gap-4">
                    <img src={member.thumbnailURL} className="w-8 h-8 rounded-full" />
                    <div>
                        <div>{member.firstName + " " + member.lastName}</div>
                        <div>{member.status}</div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
