// useTasksWebSocket.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import type { ToastActionElement } from "@/components/ui/toast";


/**
 * Represents a message from the "tasks" channel, e.g. { phase, detail, action, data }
 */
interface TaskMessage {
    phase: string;
    detail?: string;
    action?: string;
    data?: any;  // e.g. { object_id, object_type, ... }
}

export function useTasksWebSocket() {
    const { toast } = useToast();
    const [taskMessages, setTaskMessages] = useState<TaskMessage[]>([]);
    const tasksSocketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        // Open the WebSocket
        const ws = new WebSocket("wss://server-clous-3ac15fe26491.herokuapp.com/ws/tasks/");

        // Setup ping interval
        const pingInterval = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: 'ping' }));
            }
        }, 30000); // Send ping every 30 seconds


        ws.onopen = () => {
            console.log("Connected to 'tasks' WebSocket.");
        };

        ws.onmessage = (event) => {
            // Parse incoming data, which typically looks like:
            // {
            //   "message": {
            //     "phase": "candidate_processed",
            //     "detail": "Candidate processed successfully",
            //     "action": "onViewResume",
            //     "data": { "object_id": "...", "object_type": "resume" }
            //   }
            // }
            const parsed = JSON.parse(event.data);
            if (parsed.message) {
                const message: TaskMessage = parsed.message;
                console.log("Tasks WebSocket message:", message);

                // 1) Add to local state (if you want to show a list)
                setTaskMessages((prev) => [...prev, message]);

                //         const actionElement: ToastActionElement = (
                //   <ToastAction
                //     altText="View job questions"
                //     className="border hover:none"
                //     onClick={() => {
                //       // Your onClick logic goes here.
                //       // e.g., setIsJobIdOpen((prev) => !prev);
                //       //       setSelectedJobId(jobId ?? selectedJobId);
                //       //       setIsArtifact(true);
                //       //       setIsOne(true);
                //     }}
                //   >
                //     View job
                //   </ToastAction>
                // );




                // 2) Optionally show a toast for each new message
                //    e.g. if phase= "candidate_processed", you do:
                //    or you can do a switch on message.phase
                toast({
                    variant: "default",
                    title: message.phase,
                    description: message.detail ?? "No detail available",
                    // action: actionElement,
                    // action: (
                    //     <ToastAction
                    //       altText= "View job questions"
                    //       className="border hover:none"
                    // >
                    // View job
                    //     </ ToastAction >
                    //   ) as unknown as React.ReactElement<typeof ToastAction>,
                });


            }
        };

        ws.onclose = () => {
            console.log("Tasks WebSocket closed.");
        };

        tasksSocketRef.current = ws;

        // Cleanup
        return () => {
            ws.close();
            tasksSocketRef.current = null;
        };
    }, [toast]);

    // Return any data you want from this hook
    return {
        taskMessages,
    };
}