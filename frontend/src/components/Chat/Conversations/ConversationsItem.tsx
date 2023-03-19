import { ConversationPopulated } from "../../../../../backend/src/util/types";

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
  return (
    <div className="w-full flex flex-row justify-center items-center my-2">
      <div className="w-full border-b-2 hover:rounded-md border-gray-200 hover:bg-gray-300 hover:cursor-pointer transition-all px-4 py-2">
        {conversation.id}
      </div>
    </div>
  );
};

export default ConversationItem;
