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
import Assesment from "./components/pages/Assesment";
import Layout from "./components/layout/Layout";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
export const SidebarContext = createContext(null);

const queryClient = new QueryClient();

function App() {
    const [value, setValue] = useState(false);

    return (
        <div className="h-full bg-zinc-50">
            <SidebarContext.Provider value={{value, setValue}}>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter basename="/app">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Layout>
                                        <Assesment />
                                    </Layout>
                                }
                            />
                        </Routes>
                    </BrowserRouter>
                    <ReactQueryDevtools position="right" />
                </QueryClientProvider>
            </SidebarContext.Provider>
        </div>
    );
}

export default App;
