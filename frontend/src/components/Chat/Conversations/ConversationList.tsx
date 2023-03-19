import { Session } from "next-auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { ConversationPopulated } from "../../../../../backend/src/util/types";
import ConversationItem from "./ConversationsItem";
import ConversationModal from "./Modal/Modal";

interface ConversationListProps {
  session: Session;
  conversations: Array<ConversationPopulated>;
  onViewConversation: (conversationId: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  session,
  conversations,
  onViewConversation,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const {
    user: { id: userId },
  } = session;

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
        <h3 className="font-semibold mt-6">Conversations</h3>
      </div>
      <ConversationModal
        session={session}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          userId={userId}
          onClick={() => onViewConversation(conversation.id)}
          isSelected={conversation.id === router.query.conversationId}
        />
      ))}
    </div>
  );
};

export default ConversationList;
