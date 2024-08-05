import { Component } from "react"

type HeaderType = {
    desktopTitle: string,
    desktopSubtitle: string,
    mobileTitle: string,
    mobileSubtitle: string,
    children?: any,
}

type HeaderBtn = {
   icon: any,
   text: string,
}

export function Header({desktopTitle, desktopSubtitle, mobileTitle, mobileSubtitle, children}:HeaderType){
    return (
        <div className="w-full flex justify-between">
            <div>
                <div className="max-lg:hidden">{desktopTitle}</div>
                <div className="max-lg:hidden">{desktopSubtitle}</div>
                <div className="lg:hidden">{mobileTitle}</div>
                <div className="lg:hidden">{mobileSubtitle}</div>
            </div>
            <div>{children}</div>
        </div>         
    )
}

export function HeaderBtn({icon, text}:HeaderBtn){
    return (
       <button className="flex items-center gap-2  border-2 p-2 rounded-lg ">
            {icon}
            {text}
       </button>
    )
}