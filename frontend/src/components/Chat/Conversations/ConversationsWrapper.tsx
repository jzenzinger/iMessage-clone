import SignOutButton from "@/components/Auth/SignOutButton";
import { Session } from "next-auth";
import ConversationList from "./ConversationList";

interface ConversationsWrapperProps {
  session: Session;
}

const ConversationsWrapper: React.FC<ConversationsWrapperProps> = ({
  session,
}) => {
  return (
    <div className="sm:w-full md:w-80 border bg-white shadow-xl md:rounded-lg m-2">
      {/* Skeleton Loader */}
      <ConversationList session={session}/>
      <SignOutButton />
    </div>
  )
};

export default ConversationsWrapper;
