import CountBtn from "@/components/CountBtn";
import ReactSVG from "@/assets/react.svg";
import {Badge} from "@/components/ui/badge";
import {Button} from "./components/ui/button";
import {Input} from "./components/ui/Input";
import Assistant from "./components/features/Assistant";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import {createContext, useContext, useState} from "react";
import SidebarSearch from "./components/layout/SidebarSeach";
import SidebarSearchAccent from "./components/layout/SidebarSeachAccent";
import Layout1 from "./components/layout/Layout";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/layout/Layout";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import Programme from "./components/pages/Programmes";
import TableDiaglog from "./components/pages/TableDiaglog";
import {DataTableDemo} from "./components/pages/DataTableDiaglog";
import Inbox from "./components/pages/Inbox";
import MessagesPage from "./components/pages/MessagesPage";
import LibraryPage from "./components/pages/LibraryPage";
import {Library} from "./components/pages/Libary";
import {Folder} from "./components/pages/Folder";
import PlannerPage from "./components/pages/PlannerPage";
import {Planner} from "./components/pages/Planner";
export const SidebarContext = createContext(null);

const queryClient = new QueryClient();

function App() {
    const [value, setValue] = useState(false);

    return (
        <div className="h-full max-w-full overflow-y-hidden bg-zinc-50">
            <SidebarContext.Provider value={{value, setValue}}>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter basename="/">
                        <Routes>
                            <Route
                                path="/t"
                                element={
                                    <Layout>
                                        <TableDiaglog />
                                    </Layout>
                                }
                            />
                            <Route
                                path="/dt"
                                element={
                                    <Layout>
                                        <DataTableDemo />
                                    </Layout>
                                }
                            />
                            <Route
                                path="/programme"
                                element={
                                    <Layout>
                                        <Programme />
                                    </Layout>
                                }
                            />
                            <Route
                                path="/location/messages"
                                element={
                                    <Layout>
                                        <MessagesPage page={<Inbox />} />
                                    </Layout>
                                }
                            />
                            <Route
                                path="/location/library"
                                element={
                                    <Layout>
                                        <LibraryPage page={<Library />} />
                                    </Layout>
                                }
                            />
                            <Route
                                path="/location/planner"
                                element={
                                    <Layout>
                                        <PlannerPage page={<Planner />} />
                                    </Layout>
                                }
                            />
                            <Route
                                path="/location/library/:Id"
                                element={
                                    <Layout>
                                        <LibraryPage page={<Folder />} />
                                    </Layout>
                                }
                            />
                            <Route path="/home" element={<Layout children={undefined}></Layout>} />
                        </Routes>
                    </BrowserRouter>
                    <ReactQueryDevtools position="right" />
                </QueryClientProvider>
            </SidebarContext.Provider>
        </div>
    );
}

export default App;
