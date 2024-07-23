import React, {useEffect, useState} from "react";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "../ui/Sheet";
import {Input} from "../ui/Input";
import {Button} from "../ui/button";
import {Content} from "@radix-ui/react-dialog";
import {read} from "fs";
import {IconRobot, IconUser} from "@tabler/icons-react";
import {ScrollArea} from "../ui/ScrollArea";

export default function Assistant() {
    const [convo, setConvo] = useState([{content: "Hello I'm the Ai Assistant, How may I help you?", user: false}]);
    const responses = [
        {content: "I will look into this for you now", user: false},
        {content: "Can you give me a Id number", user: false},
        {content: "Can you give me a date", user: false},
        {content: "When would you like this action to go ahead", user: false},
    ];

    useEffect(() => {
        setTimeout(() => {
            const random = Math.floor(Math.random() * responses.length);
            if (convo[convo.length - 1]?.user) {
                setConvo((convo) => [...convo, responses[random]]);
            }
        }, 1000);
    }, [convo]);

    return (
        <Sheet>
            <SheetTrigger className="p-1 active:bg-white/25 rounded-lg">
                <IconRobot />
            </SheetTrigger>
            <SheetContent className="gap-4 flex-col flex w-96 ">
                <SheetHeader>
                    <SheetTitle className="text-black">Assistant</SheetTitle>
                    <SheetDescription>Ai Assistant, use to ask questions performa task and query member information.</SheetDescription>
                </SheetHeader>
                <div className="w-full flex flex-col gap-1 mt-4">
                    {convo?.map((x) => {
                        return (
                            <div className="flex gap-2 w-full items-center">
                                <div className={`p-2  max-w-fit rounded-xl overflow-visible ${x.user ? "ml-auto bg-blue-600 " : "mr-auto bg-green-600"}`}>{x.content}</div>
                            </div>
                        );
                    })}
                </div>
                <UserInputForm askFunc={(x: any) => setConvo((convo) => [...convo, {content: x, user: true}])} />
            </SheetContent>
        </Sheet>
    );
}

function UserInputForm({askFunc}) {
    const [input, setInput] = useState("");

    return (
        <form
            className="flex gap-2 flex-col mt-4"
            onSubmit={(e) => {
                e.preventDefault();
                askFunc(input);
                e.target.reset();
            }}
        >
            <Input name="input" className="bg-zinc-50 border-2 border-zinc-200 outline-none " placeholder="Ask..." onChange={(e) => setInput(e.target.value)} />
            <Button className="w-full bg-blue-500 text-white max-lg:hidden" type="submit">
                Ask Assistant
            </Button>
        </form>
    );
}
