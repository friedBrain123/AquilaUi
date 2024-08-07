import {Component} from "react";

type HeaderType = {
    desktopTitle: string;
    desktopSubtitle: string;
    mobileTitle: string;
    mobileSubtitle: string;
    children?: any;
};

type HeaderBtn = {
    icon: any;
    text: string;
};

export function Header({desktopTitle, desktopSubtitle, mobileTitle, mobileSubtitle, children}: HeaderType) {
    return (
        <div className="w-full flex justify-between max-lg:h-24 py-4 max-lg:px-4 z-0 max-lg:bg-themered">
            <div>
                <div className="max-lg:hidden font-semibold text-zinc-600 ">{desktopTitle}</div>
                <div className="max-lg:hidden font-medium text-zinc-400">{desktopSubtitle}</div>
                <div className="lg:hidden font-semibold text-zinc-100">{mobileTitle}</div>
                <div className="lg:hidden font-medium text-zinc-300">{mobileSubtitle}</div>
            </div>
            <div>{children}</div>
        </div>
    );
}

export function HeaderBtn({icon, text}: HeaderBtn) {
    return (
        <button className="flex items-center gap-2 lg:bg-white lg:border lg:text-zinc-600   max-lg:bg-white/15 transition-all duration-300 text-zinc-100 p-2 rounded-lg ">
            {icon}
            <span className="max-lg:hidden">{text}</span>
        </button>
    );
}
