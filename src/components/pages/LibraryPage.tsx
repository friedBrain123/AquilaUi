import React, {Children, ReactNode} from "react";
import Footer from "../layout/Footer";
import {IconFolderCancel, IconFolders, IconFolderStar, IconMailbox, IconPlaneOff, IconStackPop, IconTrash} from "@tabler/icons-react";

export default function LibraryPage({page}: ReactNode) {
    return (
        <>
            <div className="mb-8 h-full w-full lg:p-4"> {page}</div>
            <Footer items={[{icon: <IconFolders />, link: "/location/library"}]} />
        </>
    );
}
