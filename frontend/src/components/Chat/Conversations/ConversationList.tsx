import { Session } from "next-auth";
import { useRouter } from "next/router";
import React, { SetStateAction, useState } from "react";
import { ConversationPopulated } from "../../../../../backend/src/util/types";
import ConversationItem from "./ConversationsItem";
import ConversationModal from "./Modal/Modal";
import ButtonStyled from "@/components/UI/ButtonStyled";

interface ConversationListProps {
  session: Session;
  conversations: Array<ConversationPopulated>;
  onViewConversation: (conversationId: string) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const ConversationList: React.FC<ConversationListProps> = ({
  session,
  conversations,
  onViewConversation,
  isOpen,
  setIsOpen,
}) => {
  const router = useRouter();
  const {
    user: { id: userId },
  } = session;

  return (
    <div className="w-full py-2 px-2">
      <h3 className="font-semibold my-2">Conversations</h3>
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
