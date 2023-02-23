import { Session } from "next-auth";
import { useState } from "react";
import ConversationModal from "./Modal/Modal";

interface ConversationListProps {
  session: Session;
}

const ConversationList: React.FC<ConversationListProps> = ({ session }) => {
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
      <ConversationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default ConversationList;
