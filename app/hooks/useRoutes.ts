import { useMemo } from "react";
import { usePathname } from "next/navigation";

import { signOut } from "next-auth/react";

import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";

import { useConverstion } from "./useConversation";

export const useRoutes = () => {
   const pathName = usePathname();
   const { conversationId } = useConverstion();

   const routes = useMemo(
      () => [
         {
            label: "Chat",
            href: "/conversations",
            icon: HiChat,
            active: pathName === "/conversations" || !!conversationId,
         },
         {
            label: "Users",
            href: "/users",
            icon: HiUsers,
            active: pathName === "/users" || !!conversationId,
         },
         {
            label: "Logout",
            href: "#",
            onClick: () => signOut(),
            icon: HiArrowLeftOnRectangle,
         },
      ],
      [pathName, conversationId]
   );

   return routes;
};
