import { Session } from "next-auth";
import ConversationList from "./ConversationList";

interface ConversationsWrapperProps {
  session: Session;
}

const ConversationsWrapper: React.FC<ConversationsWrapperProps> = ({
  session,
}) => {
  return (
    <div className="sm:w-full md:w-80 border bg-gray-300 md:rounded-lg m-2">
      {/* Skeleton Loader */}
      <ConversationList session={session}/>
    </div>
  )
};

export default ConversationsWrapper;
