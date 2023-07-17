import { getConversation } from "../actions/getConversation";
import { getUsers } from "../actions/getUsers";
import { Sidebar } from "../components/sidebar/Sidebar";
import { ConversationList } from "./components/ConversationList";

const ConversationLayout = async ({ children }: { children: React.ReactNode }) => {
   const conversations = await getConversation();
   const users = await getUsers();
   return (
      <Sidebar>
         <div className="h-full">
            <ConversationList initialItems={conversations} users={users} />
            {children}
         </div>
      </Sidebar>
   );
};

export default ConversationLayout;
