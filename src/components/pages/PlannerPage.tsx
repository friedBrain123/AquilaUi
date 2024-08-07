import React, {Children, ReactNode} from "react";
import Footer from "../layout/Footer";
import {IconFolderCancel, IconFolders, IconFolderStar, IconListCheck, IconMailbox, IconPlaneOff, IconStackPop, IconTrash} from "@tabler/icons-react";
import {Icon} from "@radix-ui/react-select";

export default function PlannerPage({page}: ReactNode) {
    return (
        <>
            <div className="mb-12 h-full w-full lg:p-4"> {page}</div>
            <Footer items={[{icon: <IconListCheck />, link: "/location/planner"}]} />
        </>
    );
}
