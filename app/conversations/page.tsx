"use client";

import clsx from "clsx";

import { useConverstion } from "../hooks";
import { EmptyState } from "../components/EmptyState";

const ConversationPage = () => {
   const { isOpen } = useConverstion();
   return (
      <div className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}>
         <EmptyState />
      </div>
   );
};

export default ConversationPage;
