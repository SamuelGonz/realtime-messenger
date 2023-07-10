"use client";

import { useConverstion, useRoutes } from "@/app/hooks";
import { MobileItem } from "./MobileItem";

export const MobileFooter = () => {
   const routes = useRoutes();
   const { isOpen } = useConverstion();

   if (isOpen) return null;

   return (
      <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t lg:hidden">
         {routes.map((route) => (
            <MobileItem
               key={route.href}
               href={route.href}
               active={route.active}
               icon={route.icon}
               onClick={route.onClick}
            />
         ))}
      </div>
   );
};
