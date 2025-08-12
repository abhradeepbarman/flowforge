import type { Trigger } from "@/@types/common";
import { useGetAllAppsQuery } from "@/features/apps/api/getAllAppsApiSlice";
import { useGetAppEventsQuery } from "@/features/apps/api/getAppEventsApiSlice";
import { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";

const CreateTrigger = ({ flowId }: { flowId: string }) => {
    const [triggerData, setTriggerData] = useState({
        app: "",
        event: "",
        executionInterval: "",
    });
    const { data } = useGetAllAppsQuery();
    const { data: events } = useGetAppEventsQuery(
        {
            appKey: triggerData.app,
            isTrigger: true,
        },
        {
            skip: !triggerData.app,
        },
    );

    const handleConnect = async () => {
        // try {
        //     await appLogin(triggerData.app).unwrap();
        // } catch (error) {
        //     console.error("Error creating trigger:", error);
        // }

        const popup = window.open(
            `http://localhost:8000/api/v1/app/${triggerData.app}/login`,
            "googleLogin",
            "width=600,height=700",
        );

        // Listen for message from popup
        window.addEventListener("message", (event) => {
            if (event.origin !== "http://localhost:8000") return; // security check
            if (event.data.type === "OAUTH_SUCCESS") {
                console.log("User logged in!", event.data.payload);
                popup?.close();
            }
        });
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className='border-dashed px-10 py-5 border-5 w-sm'>
                    Create Trigger
                </div>
            </SheetTrigger>
            <SheetContent className='px-10'>
                <SheetHeader>
                    <SheetTitle>Create Trigger</SheetTitle>
                </SheetHeader>

                <div>
                    <Accordion type='single' collapsible>
                        <AccordionItem value='item-1'>
                            <AccordionTrigger>
                                Choose an app & event
                            </AccordionTrigger>
                            <AccordionContent>
                                <Select
                                    value={triggerData.app}
                                    onValueChange={(value) =>
                                        setTriggerData({
                                            ...triggerData,
                                            app: value,
                                        })
                                    }
                                >
                                    <SelectTrigger className='w-[180px]'>
                                        <SelectValue placeholder='Select an app' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {data?.data.map((app) => (
                                                <SelectItem
                                                    key={app.key}
                                                    value={app.key}
                                                >
                                                    {app.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                {triggerData.app && (
                                    <Select
                                        value={triggerData.event}
                                        onValueChange={(value) =>
                                            setTriggerData({
                                                ...triggerData,
                                                event: value,
                                            })
                                        }
                                    >
                                        <SelectTrigger className='w-[180px]'>
                                            <SelectValue placeholder='Select an event' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {events?.data.map((event) => (
                                                <SelectItem
                                                    key={event.key}
                                                    value={event.key}
                                                >
                                                    {event.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}

                                {triggerData.event &&
                                    events?.data.map((event) => {
                                        if (event.key === triggerData.event) {
                                            return (
                                                <Select
                                                    value={
                                                        triggerData.executionInterval
                                                    }
                                                    onValueChange={(value) =>
                                                        setTriggerData({
                                                            ...triggerData,
                                                            executionInterval:
                                                                value,
                                                        })
                                                    }
                                                >
                                                    <SelectTrigger className='w-[180px]'>
                                                        <SelectValue placeholder='Select an execution interval' />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {(
                                                            event as Trigger
                                                        )?.executionIntervals.map(
                                                            (interval) => (
                                                                <SelectItem
                                                                    key={
                                                                        interval.value
                                                                    }
                                                                    value={interval.value.toString()}
                                                                >
                                                                    {
                                                                        interval.name
                                                                    }
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            );
                                        }
                                    })}
                            </AccordionContent>
                        </AccordionItem>

                        {triggerData.executionInterval && (
                            <AccordionItem value='item-2'>
                                <AccordionTrigger>
                                    Choose connection
                                </AccordionTrigger>
                                <AccordionContent>
                                    <Button onClick={handleConnect}>
                                        Connect
                                    </Button>
                                </AccordionContent>
                            </AccordionItem>
                        )}
                    </Accordion>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default CreateTrigger;
