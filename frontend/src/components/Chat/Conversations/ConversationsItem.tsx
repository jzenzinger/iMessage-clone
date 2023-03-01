import { ConversationPopulated } from "../../../../../backend/src/util/types";

interface ConversationItemProps {
  conversation: ConversationPopulated;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
}) => {
  return (
    <div className="w-full flex flex-row justify-center items-center my-2">
      <div className="w-full border-b-2 rounder-md border-gray-300 hover:border-gray-400 hover:border-b-3 hover:cursor-pointer transition-all px-2 py-1.5">{conversation.id}</div>
    </div>
  );
};

export default ConversationItem;
