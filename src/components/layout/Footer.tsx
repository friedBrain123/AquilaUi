import React, {useContext, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import AddNewLeadDialog from "./newlead/AddNewLeadDilog";
import AddNewObservation from "./newobservation/AddNewObservationDilog";
import ContactFormDialog from "./contactForm/ContactFormDialog";
import {
    IconArrowGuide,
    IconBuilding,
    IconBuildingStore,
    IconCalendar,
    IconChecklist,
    IconChefHat,
    IconEye,
    IconEyePlus,
    IconFolder,
    IconFolders,
    IconForms,
    IconHome,
    IconIdBadge,
    IconInvoice,
    IconListCheck,
    IconLogout,
    IconMailbox,
    IconMessage,
    IconNotebook,
    IconPhoto,
    IconPlaneOff,
    IconReceipt,
    IconReport,
    IconRoute,
    IconSchool,
    IconSettings,
    IconShoppingCart,
    IconSpeakerphone,
    IconStackPop,
    IconTarget,
    IconTrash,
    IconUsers,
    IconUsersPlus,
} from "@tabler/icons-react";
import {NavLink} from "react-router-dom";

type footerItem = {
    icon: any;
    link: string;
};

const Footer: React.FC = ({items}) => {
    const footerStyles = {
        container: `h-12 fixed bottom-0 w-full bg-card lg:hidden border-t-2 border-[#B71C1C] `,
        menuItem: "flex h-full justify-around items-center px-4",
        icon: "text-zinc-400 w-5 h-5",
        iconActive: "text-[#B71C1C] w-5 h-5",
    };

    return (
        <div className={footerStyles.container}>
            <ul className={footerStyles.menuItem}>
                {items?.map((item, index) => {
                    console.log(item);
                    return (
                        <li>
                            <NavLink to={item.link} className={(link) => (link.isActive ? footerStyles.iconActive : footerStyles.icon)}>
                                {item.icon}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Footer;
