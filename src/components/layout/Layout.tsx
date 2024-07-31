import React, {Children} from "react";
import SidebarSearchAccent from "./SidebarSeachAccent";
import Navbar from "./Navbar";
import {useQuery} from "@tanstack/react-query";
import {getPendingStatements, getStatements, getSummary} from "@/api/Statement";
import {Table} from "../ui/Table";
import {Toaster} from "../ui/Toaster";

export default function Layout({children}) {
    // const {data: statements} = useQuery({queryKey: ["statements"], queryFn: getStatements});
    // const {data: pendingStatements} = useQuery({queryKey: ["pendingStatments"], queryFn: getPendingStatements});
    // const {data: summary} = useQuery({queryKey: ["summary"], queryFn: getSummary});

    return (
        <div className="flex w-full">
            <SidebarSearchAccent />
            <div className="w-full flex flex-col">
                <Navbar />
                <div className="p-4 ">
                    {children}
                    <Toaster />
                    {/* <Table>
                        <thead>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Net Due</th>
                            <th>Net Distrubuted</th>
                            <th>BalenceDue</th>
                        </thead>
                        <tbody>
                            {pendingStatements?.map((x) => {
                                return (
                                    <tr>
                                        <td>{x.location?.name}</td>
                                        <td>{x.date}</td>
                                        <td>
                                            <div className="bg-violet-700/75 text-white font-semibold text-center p-1 rounded-md">Closed</div>
                                        </td>
                                        <td>{x.totalGross}</td>
                                        <td>{x.netDue}</td>
                                        <td>{x.netDisbursed}</td>
                                        <td>{x.balanceDue}</td>
                                    </tr>
                                );
                            })}
                            {statements?.map((x) => {
                                return (
                                    <tr>
                                        <td>{x.location?.name}</td>
                                        <td>{x.date}</td>
                                        <td>
                                            <div className="bg-green-700/75 text-white font-semibold text-center p-1 rounded-md">Closed</div>
                                        </td>
                                        <td>{x.totalGross}</td>
                                        <td>{x.netDue}</td>
                                        <td>{x.netDisbursed}</td>
                                        <td>{x.balanceDue}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    <Table>
                        <thead>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Net Due</th>
                            <th>Net Distrubuted</th>
                            <th>BalenceDue</th>
                        </thead>
                        <tbody>
                            {summary?.map((x) => {
                                return (
                                    <tr>
                                        <td>{x.location?.name}</td>
                                        <td>{x.date}</td>
                                        <td>
                                            <div className="bg-violet-700/75 text-white font-semibold text-center p-1 rounded-md">Closed</div>
                                        </td>
                                        <td>{x.totalGross}</td>
                                        <td>{x.netDue}</td>
                                        <td>{x.netDisbursed}</td>
                                        <td>{x.balanceDue}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table> */}
                </div>
            </div>
        </div>
    );
}
