import { ConversationPopulated } from "../../../../../backend/src/util/types";
import { formatUsernames } from "@/util/functions";
import React, { useState } from "react";

interface ConversationItemProps {
  conversation: ConversationPopulated;
  userId: string;
  onClick: () => void;
  isSelected: boolean;
  // onEditConversation?: () => void;
  // hasSeenLastMessage?: boolean;
  // selectedConversationId?: string;
  // onDeleteConversation?: (conversationId: string) => void;
  // onLeaveConversation?: (conversation: ConversationPopulated) => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  userId,
  onClick,
  isSelected,
  // onEditConversation,
  // hasSeenLastMessage,
  // selectedConversationId,
  // onDeleteConversation,
  // onLeaveConversation,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (e.type === "click") {
      onClick();
    } else if (e.type === "contextmenu") {
      e.preventDefault();
      setMenuOpen(true);
    }
  };

  const isSelectedClasses = "bg-indigo-100 rounded-md border-0";

  return (
    <div
      className="w-full flex flex-row justify-center items-center my-2"
      onClick={handleClick}
      onContextMenu={handleClick}
    >
      <div
        className={`w-full border-b-2 hover:rounded-md border-gray-200 hover:bg-indigo-200 hover:cursor-pointer transition-all px-1 py-2 ${
          isSelected ? isSelectedClasses : ""
        }`}
      >
        <div className="flex gap-x-1">
          <div className="avatar placeholder flex">
            <div className="min-w-0 px-2 flex-col ">
              <div className="bg-indigo-600 text-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
                <span className="text-2xl">
                  {formatUsernames(conversation.participants, userId).substring(
                    0,
                    1,
                  )}
                </span>
              </div>
            </div>
            <div className="min-w-0 flex-col">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {formatUsernames(conversation.participants, userId)}
              </p>
              <p className="truncate text-xs leading-5 text-gray-500">
                {conversation.latestMessage?.body} Body message
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
