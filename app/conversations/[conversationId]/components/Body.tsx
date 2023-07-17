"use client";

import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";

import { useConverstion } from "@/app/hooks";
import { MessageBox } from "./MessageBox";
import axios from "axios";

interface Props {
   initialMessages: FullMessageType[];
}

export const Body: React.FC<Props> = ({ initialMessages }) => {
   const [messages, setMessages] = useState(initialMessages);
   const bottomRef = useRef<HTMLDivElement>(null);

   const { conversationId } = useConverstion();

   useEffect(() => {
      axios.post(`/api/conversations/${conversationId}/seen`);
   }, [conversationId]);

   return (
      <div className="flex-1 overflow-y-auto">
         {messages.map((message, i) => (
            <MessageBox isLast={i === messages.length - 1} key={message.id} data={message} />
         ))}
         <div ref={bottomRef} className="pt-24" />
      </div>
   );
};
