import React, {Children, ReactNode} from "react";
import Footer from "../layout/Footer";
import {IconMailbox, IconPlaneOff, IconStackPop, IconTrash} from "@tabler/icons-react";

export default function MessagesPage({page}: ReactNode) {
    return (
        <>
            {page}
            <Footer
                items={[
                    {icon: <IconMailbox />, link: "/location/messages"},
                    {icon: <IconPlaneOff />, link: "/location/home"},
                    {icon: <IconStackPop />, link: "/location/home"},
                    {icon: <IconTrash />, link: "/location/home"},
                ]}
            />
        </>
    );
}
