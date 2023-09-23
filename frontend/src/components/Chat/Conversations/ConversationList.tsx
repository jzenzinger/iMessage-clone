import { Session } from "next-auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ConversationPopulated } from "../../../../../backend/src/util/types";
import ConversationItem from "./ConversationsItem";
import ConversationModal from "./Modal/Modal";
import ButtonStyled from "@/components/UI/ButtonStyled";

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
      <div className="flex justify-center">
        <ButtonStyled
          handleClick={() => setIsOpen(true)}
          text="Find or start conversation"
          styling="px-3 py-2"
        />
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
