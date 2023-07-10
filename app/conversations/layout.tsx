import { getConversation } from "../actions/getConversation";
import { Sidebar } from "../components/sidebar/Sidebar";
import { ConversationList } from "./components/ConversationList";

const ConversationLayout = async ({ children }: { children: React.ReactNode }) => {
   const conversations = await getConversation();
   return (
      <Sidebar>
         <div className="h-full">
            <ConversationList initialItems={conversations} />
            {children}
         </div>
      </Sidebar>
   );
};

export default ConversationLayout;
