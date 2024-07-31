// "use client";

// import * as React from "react";
// import {
//     ColumnDef,
//     ColumnFiltersState,
//     SortingState,
//     VisibilityState,
//     flexRender,
//     getCoreRowModel,
//     getFilteredRowModel,
//     getPaginationRowModel,
//     getSortedRowModel,
//     useReactTable,
// } from "@tanstack/react-table";
// import {ArrowUpDown, ChevronDown, MoreHorizontal} from "lucide-react";

// import {Button} from "../ui/Button";
// import {Checkbox} from "../ui/Checkbox";
// import {DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "../ui/Dropdown";
// import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/Table";
// import {Input} from "../ui/Input";
// import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "../ui/Dialog";

// const data: Payment[] = [
//     {
//         id: "m5gr84i9",
//         amount: 316,
//         status: "success",
//         email: "ken99@yahoo.com",
//         method: "cash",
//     },
//     {
//         id: "3u1reuv4",
//         amount: 242,
//         status: "success",
//         email: "Abe45@gmail.com",
//         method: "cash",
//     },
//     {
//         id: "derv1ws0",
//         amount: 837,
//         status: "processing",
//         email: "Monserrat44@gmail.com",
//         method: "card",
//     },
//     {
//         id: "5kma53ae",
//         amount: 874,
//         status: "success",
//         email: "Silas22@gmail.com",
//         method: "cash",
//     },
//     {
//         id: "bhqecj4p",
//         amount: 721,
//         status: "failed",
//         email: "carmella@hotmail.com",
//         method: "card",
//     },
// ];

// export type Payment = {
//     id: string;
//     amount: number;
//     status: "pending" | "processing" | "success" | "failed";
//     email: string;
//     method: "cash" | "card";
// };

// const initialHeaders = {
//     select: "Select",
//     status: "Status",
//     email: "Email",
//     amount: "Amount",
//     method: "Method",
//     actions: "Actions",
// };

// export function DataTableDemo() {
//     const [sorting, setSorting] = React.useState<SortingState>([]);
//     const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
//     const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
//     const [rowSelection, setRowSelection] = React.useState({});
//     const [headers, setHeaders] = React.useState(initialHeaders);

//     const columns: ColumnDef<Payment>[] = [
//         {
//             id: "select",
//             header: ({table}) => (
//                 <Checkbox
//                     checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
//                     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//                     aria-label="Select all"
//                 />
//             ),
//             cell: ({row}) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
//             enableSorting: false,
//             enableHiding: false,
//         },
//         {
//             accessorKey: "status",
//             header: headers.status,
//             cell: ({row}) => <div className="capitalize">{row.getValue("status")}</div>,
//         },
//         {
//             accessorKey: "email",
//             header: ({column}) => {
//                 return (
//                     <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
//                         {headers.email}
//                         <ArrowUpDown className="ml-2 h-4 w-4" />
//                     </Button>
//                 );
//             },
//             cell: ({row}) => <div className="lowercase">{row.getValue("email")}</div>,
//         },
//         {
//             accessorKey: "amount",
//             header: () => <div className="text-right">{headers.amount}</div>,
//             cell: ({row}) => {
//                 const amount = parseFloat(row.getValue("amount"));

//                 // Format the amount as a dollar amount
//                 const formatted = new Intl.NumberFormat("en-US", {
//                     style: "currency",
//                     currency: "USD",
//                 }).format(amount);

//                 return <div className="text-right font-medium">{formatted}</div>;
//             },
//         },
//         {
//             accessorKey: "method",
//             header: ({column}) => {
//                 return (
//                     <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
//                         {headers.method}
//                     </Button>
//                 );
//             },
//             cell: ({row}) => <div className="lowercase">{row.getValue("method")}</div>,
//         },
//         {
//             id: "actions",
//             enableHiding: false,
//             header: headers.actions,
//             cell: ({row}) => {
//                 const payment = row.original;
//                 const [state, setState] = React.useState(false);

//                 return (
//                     <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" className="h-8 w-8 p-0">
//                                 <span className="sr-only">Open menu</span>
//                                 <MoreHorizontal className="h-4 w-4" />
//                             </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                             <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>Copy payment ID</DropdownMenuItem>
//                             <DropdownMenuSeparator />
//                             <DropdownMenuItem>View customer</DropdownMenuItem>
//                             <DropdownMenuItem onSelect={(e) => e.preventDefault()} s>
//                                 <Dialog open={state}>
//                                     <DialogTrigger onClick={() => setState(true)}>Open</DialogTrigger>
//                                     <DialogContent>
//                                         <DialogHeader>
//                                             <DialogTitle>Are you absolutely sure?</DialogTitle>
//                                             <DialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</DialogDescription>
//                                         </DialogHeader>
//                                     </DialogContent>
//                                 </Dialog>
//                             </DropdownMenuItem>
//                         </DropdownMenuContent>
//                     </DropdownMenu>
//                 );
//             },
//         },
//     ];

//     const table = useReactTable({
//         data,
//         columns,
//         onSortingChange: setSorting,
//         onColumnFiltersChange: setColumnFilters,
//         getCoreRowModel: getCoreRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//         getFilteredRowModel: getFilteredRowModel(),
//         onColumnVisibilityChange: setColumnVisibility,
//         onRowSelectionChange: setRowSelection,
//         state: {
//             sorting,
//             columnFilters,
//             columnVisibility,
//             rowSelection,
//         },
//     });

//     const handleHeaderChange = (columnId: string, newHeader: string) => {
//         setHeaders((prev) => ({...prev, [columnId]: newHeader}));
//     };

//     return (
//         <div className="w-full">
//             <div className="flex items-center py-4">
//                 {Object.keys(headers).map((columnId) => (
//                     <Input
//                         key={columnId}
//                         placeholder={`Change ${columnId} header...`}
//                         value={headers[columnId]}
//                         onChange={(event) => handleHeaderChange(columnId, event.target.value)}
//                         className="max-w-sm mr-2"
//                     />
//                 ))}
//             </div>
//             <div className="rounded-md border">
//                 <Table>
//                     <TableHeader>
//                         {table.getHeaderGroups().map((headerGroup) => (
//                             <TableRow key={headerGroup.id}>
//                                 {headerGroup.headers.map((header) => {
//                                     return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
//                                 })}
//                             </TableRow>
//                         ))}
//                     </TableHeader>
//                     <TableBody>
//                         {table.getRowModel().rows?.length ? (
//                             table.getRowModel().rows.map((row) => (
//                                 <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
//                                     {row.getVisibleCells().map((cell) => (
//                                         <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
//                                     ))}
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow>
//                                 <TableCell colSpan={columns.length} className="h-24 text-center">
//                                     No results.
//                                 </TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </div>
//         </div>
//     );
// }
