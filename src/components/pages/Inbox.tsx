import React, {Children, useEffect, useState} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/Card";
import {Button} from "../ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/Select";
import {Input} from "../ui/Input";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../ui/Tab";
import {Search} from "lucide-react";
import {Header, HeaderBtn} from "../layout/Header";
import {report} from "process";
import {Dialog} from "@radix-ui/react-dialog";
import {DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "../ui/Dialog";
import {IconArrowRightTail, IconCornerRightUp, IconCornerUpRight, IconDotsVertical, IconHandStop, IconMailOpened, IconMailPlus, IconTrash} from "@tabler/icons-react";
import {Skeleton} from "../ui/Skeleton";
import {NavLink} from "react-router-dom";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem} from "../ui/Dropdown";
import {DropdownMenuTrigger} from "@radix-ui/react-dropdown-menu";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "../ui/Tooltip";

export default function Inbox() {
    let messages = [
        {
            id: 1,
            name: "William Smith",
            date: "2024-10-10",
            subject: "Project Update",
            preview: "hello how are you doin...",
            content: "hello how are you doing today? Are you able to get back to me on that workload.",
            read: false,
        },
        {
            id: 2,
            name: "Jessica Johnson",
            date: "2024-11-12",
            subject: "Meeting Schedule",
            preview: "just checking if you...",
            content: "Just checking if you're available for the meeting tomorrow at 10 AM.",
            read: true,
        },
        {
            id: 3,
            name: "Michael Brown",
            date: "2024-09-15",
            subject: "Document Review",
            preview: "can you please review...",
            content: "Can you please review the attached document and provide your feedback?",
            read: true,
        },
        {
            id: 4,
            name: "Emily Davis",
            date: "2024-08-22",
            subject: "Budget Approval",
            preview: "the budget for Q4 is...",
            content: "The budget for Q4 is ready for your approval. Please let me know your thoughts.",
            read: true,
        },
        {
            id: 5,
            name: "James Wilson",
            date: "2024-07-30",
            subject: "Client Feedback",
            preview: "received feedback fr...",
            content: "Received feedback from the client on the recent project. Let's discuss it.",
            read: false,
        },
        {
            id: 6,
            name: "Linda Martinez",
            date: "2024-06-18",
            subject: "Event Planning",
            preview: "planning the company...",
            content: "Planning the company event next month. Need your input on the venue.",
            read: true,
        },
        {
            id: 7,
            name: "Robert Taylor",
            date: "2024-05-27",
            subject: "Tech Support",
            preview: "experiencing issues...",
            content: "Experiencing issues with my laptop. Can you assist with the troubleshooting?",
            read: true,
        },
        {
            id: 8,
            name: "Sarah Anderson",
            date: "2024-04-14",
            subject: "Performance Review",
            preview: "your performance rev...",
            content: "Your performance review is scheduled for next week. Please prepare your report.",
            read: true,
        },
        {
            id: 9,
            name: "David Thomas",
            date: "2024-03-19",
            subject: "Team Meeting",
            preview: "reminder for our tea...",
            content: "Reminder for our team meeting tomorrow. Please come prepared with your updates.",
            read: false,
        },
        {
            id: 10,
            name: "Laura Jackson",
            date: "2024-02-23",
            subject: "Marketing Strategy",
            preview: "we need to finalize...",
            content: "We need to finalize the marketing strategy for the upcoming quarter. Let's meet.",
            read: false,
        },
    ];

    for (let i = 0; i < 4; i++) {
        messages.push(...messages);
    }

    const [filtered, setFilterd] = useState(messages);

    const [selectedMessage, setSelectedMessage] = useState({message: messages[0], id: messages[0].id});

    const [readFilted, setReadFiltered] = useState(false);

    function SetFilterFunc(value) {
        const result = messages.filter((x) => x.name.toLowerCase().includes(value.toLowerCase()));
        setFilterd(result);
    }

    return (
        <>
            <Header desktopTitle="Messages/Inbox" desktopSubtitle={messages.length + " Messages"} mobileTitle="Inbox" mobileSubtitle={messages.length + " Messages"}>
                <CreateMessage />
            </Header>
            <div className="flex w-full gap-4 max-lg:hidden">
                <div className="w-2/5 space-y-4  bg-card p-4 border rounded-lg">
                    <div className="flex justify-between w-full ">
                        <Select onValueChange={() => setFilterd(filtered.filter((x) => x.id * 2 == 20))}>
                            <SelectTrigger className="w-[100px] border-0 font-medium text-zinc-600">
                                <SelectValue defaultValue="Inbox" placeholder="Inbox" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Inbox">Inbox</SelectItem>
                                <SelectItem value="outbox">Outbox</SelectItem>
                                <SelectItem value="dark">Deleted</SelectItem>
                                <SelectItem value="system">Junk</SelectItem>
                            </SelectContent>
                        </Select>
                        {/* <Tabs defaultValue="read" onValueChange={(e) => setReadFiltered(e.target.value == "read" ? true : false)}>
                        <TabsList>
                            <TabsTrigger value="read">All mail</TabsTrigger>
                            <TabsTrigger value="unread">Un-read</TabsTrigger>
                        </TabsList>
                    </Tabs> */}
                    </div>
                    <div>
                        <Input type="text" className="mt-4 " placeholder={"Search..."} onChange={(e) => SetFilterFunc(e.target.value)} />
                        <div className="mb-2 ml-2 text-sm text-zinc-500">{"(" + filtered.length + " results found)"}</div>
                    </div>
                    <div className="flex flex-col border rounded-lg divide-y  h-screen overflow-y-scroll w-full">
                        {filtered
                            // .filter((x) => (x.read == readFilted ? true : false || true))
                            .map((message) => {
                                return <Message message={message} selected={message.id == selectedMessage.id} setMessage={() => setSelectedMessage({message: message, id: message.id})} />;
                            })}
                    </div>
                </div>
                <CurrentMessage {...selectedMessage.message} />
            </div>
            <div className="flex flex-col rounded-lg divide-y w-full z-20 px-4 lg:hidden">
                {filtered
                    // .filter((x) => (x.read == readFilted ? true : false || true))
                    .map((message) => {
                        return <Message message={message} selected={message.id == selectedMessage.id} setMessage={() => setSelectedMessage({message: message, id: message.id})} />;
                    })}
            </div>
        </>
    );
}

function Message({message, setMessage, selected}) {
    const styles = {
        title: "font-semibold",
        subject: "text-zinc-600",
        preview: "text-zinc-500",
        mobileCard: "lg:hidden bg-card shadow-lg p-2",
        desktopCard: `${selected && "bg-zinc-100"} hover:cursor-pointer hover:bg-zinc-100 bg-white p-4 relative max-lg:hidden`,
        notification: "bg-red-500 p-1.5 absolute rounded-full left-1.5 top-6",
    };

    return (
        <>
            <div onClick={setMessage} className={styles.desktopCard}>
                {!message.read && <div className={styles.notification}></div>}
                <div className="ml-2">
                    <div className="flex justify-between">
                        <div>
                            <div className={styles.title}> {message.name}</div>
                            <div className={styles.subject}>{message.subject}</div>
                        </div>
                        <div className={styles.preview}>{ConvertDataAgo(new Date(message.date).toISOString().split("T")[0])}</div>
                    </div>
                    <div className={styles.preview}>{message.content}</div>
                </div>
            </div>
            <div className={styles.mobileCard}>
                <div className="flex justify-between">
                    <div>
                        <div className={styles.title}> {message.name}</div>
                        <div className={styles.subject}>{message.subject}</div>
                    </div>
                    <div className={styles.preview}>{ConvertDataAgo(new Date(message.date).toISOString().split("T")[0])}</div>
                </div>
                <div className={styles.preview}>{message.preview}</div>
            </div>
        </>
    );
}

function CurrentMessage(message) {
    const styles = {
        header: "bg-card h-20 border flex justify-between p-4 rounded-t-lg",
    };

    return (
        <div className="w-full">
            <div className={styles.header}>
                <div className="flex gap-3">
                    <div className="bg-zinc-100 flex items-center h-10 p-2 rounded-full">{message.name.split(" ")[0][0] + message.name.split(" ")[1][0]}</div>
                    <div>
                        <div className="font-semibold">{message.name}</div>
                        <div className="text-zinc-600">{message.subject}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="text-zinc-500 border-r-2  pr-2 border-zinc-300 ">{CovnertDate(message.date)}</div>
                    <MessageReply />
                    <MessageActions />
                </div>
            </div>
            <div className="bg-card rounded-b-lg min-h-96  border border-t-0 p-4">{message.content + " " + message.content + " " + message.content + " " + message.content}</div>
            <Input className="bg-card mt-4  w-full  outline-none border" type="text" placeholder="Reply to message..." />
            <div className="w-full flex mt-4">
                <Button className="ml-auto">Send</Button>
            </div>
        </div>
    );
}

function Searcher({array, handler}) {
    const [isDateSorted, setIsDateSorted] = useState(false);

    const [filteredArray, setFilterArray] = useState([]);

    useEffect(() => {
        handler(filteredArray);
    }, [filteredArray]);

    function handleInput(e) {
        let input = e.toLowerCase();
        const filteredArray = array.filter(
            (obj) => obj.preview.toLowerCase().includes(input) || obj.member?.contactName.toLowerCase().includes(input) || obj.senderTelephoneNumber?.telephone.includes(input)
        );
        setFilterArray(filteredArray);
    }

    // function SortDateAsce() {
    //     const NewfilteredArray = filteredArray.sort((a, b) => (a.createdOn > b.createdOn ? 1 : -1));
    //     setFilterArray(NewfilteredArray);
    // }

    // function SortDateDesc() {
    //     const NewfilteredArray = filteredArray.sort((a, b) => (a.createdOn < b.createdOn ? 1 : -1));
    //     setFilterArray(NewfilteredArray);
    // }

    return (
        <div className="w-full max-lg:p-3 lg:pb-4  max-lg:border-b-2 border-b flex">
            <input onChange={(e) => handleInput(e.target.value)} className="border-2 p-2 rounded-l-lg w-full outline-none focus:border-accent" placeholder="Search for a message..." />
            {/* <button
                onClick={() => {
                    !isDateSorted ? SortDateAsce() : SortDateDesc();
                    setIsDateSorted(!isDateSorted);
                }}
                className="border-2  border-l-0 hover:bg-innercard rounded-r-lg p-1"
            >
                {isDateSorted ? <IconCalendarUp /> : <IconCalendarDown />}
            </button> */}
        </div>
    );
}

function ConvertDataAgo(dateTime) {
    const dateNow = new Date();

    let timeSpan = dateNow.getTime() - new Date(dateTime).getTime();
    let result = "";
    if (timeSpan <= 60 * 1000) {
        result = "Just now";
    } else if (timeSpan <= 60 * 60 * 1000) {
        let minutes = Math.floor(timeSpan / (60 * 1000));
        result = minutes > 1 ? `${minutes} minutes ago` : "About a minute ago";
    } else if (timeSpan <= 24 * 60 * 60 * 1000) {
        let hours = Math.floor(timeSpan / (60 * 60 * 1000));
        result = hours > 1 ? `${hours} hours ago` : "An hour ago";
    } else if (timeSpan <= 30 * 24 * 60 * 60 * 1000) {
        let days = Math.floor(timeSpan / (24 * 60 * 60 * 1000));
        result = days > 1 ? `${days} days ago` : "Yesterday";
    } else if (timeSpan <= 365 * 24 * 60 * 60 * 1000) {
        let months = Math.floor(timeSpan / (30 * 24 * 60 * 60 * 1000));
        result = months > 1 ? `${months} months ago` : "A month ago";
    } else {
        let years = Math.floor(timeSpan / (365 * 24 * 60 * 60 * 1000));
        result = years > 1 ? `${years} years ago` : "A year ago";
    }

    return result;
}

function CreateMessage() {
    return (
        <Dialog>
            <DialogTrigger>
                <HeaderBtn icon={<IconMailPlus />} text="New Message"></HeaderBtn>
            </DialogTrigger>
            <DialogContent onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Create a new message</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <Input placeholder="Recipent E-mail address" />
                    <Input placeholder="Subject" className="my-3" />
                    <Input placeholder="Content" />
                </DialogDescription>
                <DialogFooter>
                    <DialogClose>
                        <Button variant={"secondary"}>Cancel</Button>
                    </DialogClose>
                    <DialogTrigger asChild>
                        <Button>Submit</Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function MessageActions() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <IconDotsVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className="space-x-2">
                    <IconMailOpened size={20} className="mr-2" />
                    Mark as read
                </DropdownMenuItem>
                <DropdownMenuItem className="space-x-2">
                    <IconTrash size={20} className="mr-2" />
                    Delete Message
                </DropdownMenuItem>
                <DropdownMenuItem className="space-x-2">
                    <IconHandStop size={20} className="mr-2" />
                    Block Address
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function MessageReply() {
    return (
        <Dialog>
            <DialogTrigger>
                <TooltipProvider>
                    <Tooltip delayDuration={250}>
                        <TooltipTrigger>
                            <IconCornerUpRight />
                        </TooltipTrigger>
                        <TooltipContent>Reply</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </DialogTrigger>
            <DialogContent className="overflow-y-scroll max-h-screen" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Create a new message</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <Input placeholder="Recipent E-mail address" />
                    <Input placeholder="Subject" className="my-3" />
                    <Input placeholder="Content" />
                </DialogDescription>
                <DialogFooter>
                    <DialogClose>
                        <Button variant={"secondary"}>Cancel</Button>
                    </DialogClose>
                    <DialogTrigger asChild>
                        <Button>Submit</Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function CovnertDate(date) {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return new Date(date).getDate() + " " + month[new Date(date).getMonth()] + " " + new Date(date).getFullYear();
}
