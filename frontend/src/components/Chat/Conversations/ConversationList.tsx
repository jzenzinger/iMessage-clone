import { Session } from "next-auth";
import { useState } from "react";
import { ConversationPopulated } from "../../../../../backend/src/util/types";
import ConversationItem from "./ConversationsItem";
import ConversationModal from "./Modal/Modal";

interface ConversationListProps {
  session: Session;
  conversations: Array<ConversationPopulated>
}

const ConversationList: React.FC<ConversationListProps> = ({ session, conversations }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full py-2 px-2">
      <div
        className="py-2 mb-4 bg-indigo-700 rounded-md cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setIsOpen(true)}
      >
        <p className="text-center text-white font-medium">
          Find or start conversation
        </p>
      </div>
      <div>
        <h3 className="font-semibold mt-6">
          Conversations
        </h3>
      </div>
      <ConversationModal session={session} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      {conversations.map(conversation => <ConversationItem key={conversation.id} conversation={conversation} />)}
    </div>
  );
};

export default ConversationList;
