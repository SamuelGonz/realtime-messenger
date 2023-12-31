"use client";

import { useMemo, useState } from "react";

import { useOtherUser } from "@/app/hooks";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import { Avatar } from "@/app/components/Avatar";
import { ProfileDrawer } from "./ProfileDrawer";
import { AvatarGroup } from "@/app/components/AvatarGroup";

interface Props {
   conversation: Conversation & {
      users: User[];
   };
}

export const Header: React.FC<Props> = ({ conversation }) => {
   const otherUser = useOtherUser(conversation);
   const [drawerOpen, setDrawerOpen] = useState(false);

   const statusText = useMemo(() => {
      if (conversation.isGroup) {
         return `${conversation.users.length} members`;
      }

      return "Active";
   }, [conversation]);
   return (
      <>
         <ProfileDrawer data={conversation} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
         <div className="bg-white w-full flex border-b sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
            <div className="flex gap-3 items-center">
               <Link
                  href="/conversations"
                  className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
               >
                  <HiChevronLeft size={28} />
               </Link>
               {conversation.isGroup ? <AvatarGroup users={conversation.users} /> : <Avatar user={otherUser} />}
               <div className="flex flex-col">
                  <div>{conversation.name || otherUser.name}</div>
                  <div className="text-sm font-light text-neutral-500">{statusText}</div>
               </div>
            </div>

            <HiEllipsisHorizontal
               size={28}
               onClick={() => setDrawerOpen(true)}
               className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
            />
         </div>
      </>
   );
};
