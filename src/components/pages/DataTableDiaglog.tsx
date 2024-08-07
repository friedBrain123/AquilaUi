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
import {ArrowUpDown, ChevronDown, FunctionSquareIcon, MoreHorizontal} from "lucide-react";

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
import {getmembers, UpdateMember} from "@/api/Assesment";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {IconArrowDown, IconArrowUp, IconChevronDown, IconChevronUp, IconDotsVertical, IconMail, IconMoneybag, IconUser} from "@tabler/icons-react";
import {DialogHeader, Dialog, DialogContent, DialogDescription, DialogFooter} from "../ui/Dialog";
import {DialogOverlay, DialogTitle, DialogTrigger} from "@radix-ui/react-dialog";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "../ui/HoverCard";
import {Header, HeaderBtn} from "../layout/Header";

export type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
};

const propertyOptions = [
    {id: "Profile", properties: ["reference", "dob", "gender", "age", "birthday", "groups", "keyperson", "campaign", "referrer", "notes", "diet", "allergies", "medical", "MediaConsent"]},
    {id: "Custom Properties", properties: ["custom_Property_1", "custom_Property_2", "custom_Property_3", "custom_Property_4", "custom_Property_5"]},
    {id: "Contract", properties: ["contactFirstName", "eMail", "custom_Property_3", "telephoneMobile"]},
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
                <div className=" flex items-center gap-2">
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
                    <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        {column.getIsSorted() === "asc" ? <IconArrowUp className="w-5" /> : <IconArrowDown className="w-5" />}
                    </button>
                </div>
            ),
            cell: ({row, props}) => <div className="capitalize">{row.getValue(headerProperties.colum2)}</div>,
        },
        {
            accessorKey: headerProperties.colum3,
            header: ({column}) => (
                <div className="max-2xl:hidden flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="capitalize hover:underline" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                                {headerProperties.colum3}
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
                    <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        {column.getIsSorted() == "desc" ? <IconArrowUp className="w-5" /> : <IconArrowDown className="w-5" />}
                    </button>
                </div>
            ),
            cell: ({row}) => <div className="capitalize ">{row.getValue(headerProperties.colum3)}</div>,
        },
        {
            accessorKey: headerProperties.colum4,
            header: ({column}) => (
                <div className="max-2xl:hidden flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="capitalize hover:underline" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                                {headerProperties.colum4}
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
                    <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        {column.getIsSorted() == "desc" ? <IconArrowUp className="w-5" /> : <IconArrowDown className="w-5" />}
                    </button>
                </div>
            ),
            cell: ({row}) => <div className="capitalize ">{row.getValue(headerProperties.colum4)}</div>,
        },
        {
            accessorKey: headerProperties.colum5,
            header: ({column}) => (
                <div className="max-2xl:hidden flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="capitalize hover:underline" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                                {headerProperties.colum5}
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
                    <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        {column.getIsSorted() == "desc" ? <IconArrowUp className="w-5" /> : <IconArrowDown className="w-5" />}
                    </button>
                </div>
            ),
            cell: ({row}) => <div className="capitalize ">{row.getValue(headerProperties.colum5)}</div>,
        },
        {
            accessorKey: headerProperties.colum7,
            header: ({column}) => (
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="capitalize hover:underline" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                                {headerProperties.colum7}
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
                    <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        {column.getIsSorted() == "desc" ? <IconArrowUp className="w-5" /> : <IconArrowDown className="w-5" />}
                    </button>
                </div>
            ),
            cell: ({row}) => <div className="capitalize">{row.getValue(headerProperties.colum7)}</div>,
        },
        {
            accessorKey: headerProperties.colum8,
            header: ({column}) => (
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="capitalize hover:underline" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                                {headerProperties.colum8}
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
                    <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        {column.getIsSorted() == "desc" ? <IconArrowUp className="w-5" /> : <IconArrowDown className="w-5" />}
                    </button>
                </div>
            ),
            cell: ({row}) => <div className="capitalize">{row.getValue(headerProperties.colum8)}</div>,
        },
        {
            accessorKey: headerProperties.colum9,
            header: ({column}) => (
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="capitalize hover:underline" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                                {headerProperties.colum9}
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
                    <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        {column.getIsSorted() == "desc" ? <IconArrowUp className="w-5" /> : <IconArrowDown className="w-5" />}
                    </button>
                </div>
            ),
            cell: ({row}) => <div className="capitalize">{row.getValue(headerProperties.colum9)}</div>,
        },
        {
            id: "actions",
            enableHiding: false,
            header: ({table}) => {
                return;
            },
            cell: ({row}) => {
                const payment = row.original;

                return <ActionMenu member={row.original} />;
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
            <div className="flex items-center py-4 bg-car">
                <Input
                    placeholder="Filter Members..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                {data != null && (
                    <Table className="bg-card">
                        <TableHeader className="bg-zinc-50">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header, index) => {
                                        return (
                                            <TableHead className={`${index == 3 || index == 4 || (index == 5 && "max-xl:hidden")}`} key={header.id}>
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row, index) => (
                                    <TableRow className={`${index == 3 || index == 4 || (index == 5 && "max-xl:hidden")}`} key={row.id} data-state={row.getIsSelected() && "selected"}>
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

function ActionMenu({member}) {
    const [isDialog, setDialog] = React.useState(null);
    const [photography, setphtography] = React.useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="items-center text-center">
                        <IconDotsVertical />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
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
            <EditRecord onClose={() => setDialog(null)} member={member} property={1} open={isDialog} />
            <MakeObservation onClose={() => setDialog(null)} memberId={undefined} property={"Height"} open={isDialog} />
        </>
    );
}

function EditRecord({member, property, open, onClose}) {
    const queryClient = useQueryClient();

    const EditProperty = useMutation({
        mutationFn: () => UpdateMember(member),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["members"]});
            onClose();
        },
    });

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
                    <Button onClick={() => EditProperty.mutate()} variant="default">
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

type ObservationType = {
    property: string;
    open: number | null;
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

function NewMember() {
    return (
        <Dialog>
            <DialogTrigger>
                <HeaderBtn icon={<IconUserPlus />} text="fasdf" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>fasdf</DialogTitle>
                    <DialogDescription>fasdf</DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
