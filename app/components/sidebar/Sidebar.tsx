import { getCurrentUser } from "@/app/actions/getCurrentUser";

import { DesktopSidebar } from "./DesktopSidebar";
import { MobileFooter } from "./MobileFooter";

export const Sidebar = async ({ children }: { children: React.ReactNode }) => {
   const currentUser = await getCurrentUser();

   return (
      <div className="h-full">
         <main className="lg:pl-20 h-full">
            <DesktopSidebar currentUser={currentUser!} />
            <MobileFooter />

            {children}
         </main>
      </div>
   );
};
