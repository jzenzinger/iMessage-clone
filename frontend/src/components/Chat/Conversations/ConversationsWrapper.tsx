import SignOutButton from "@/components/Auth/SignOutButton";
import { useQuery } from "@apollo/client";
import { Session } from "next-auth";
import ConversationList from "./ConversationList";
import ConversationOperations from "../../../graphql/operations/conversation";
import { ConversationsData } from "@/util/types";
import toast from "react-hot-toast";

interface ConversationsWrapperProps {
  session: Session;
}

const ConversationsWrapper: React.FC<ConversationsWrapperProps> = ({
  session,
}) => {
  const {
    data: conversationsData,
    error: conversationsError,
    loading: conversationsLoading,
    subscribeToMore  
  } = useQuery<ConversationsData, null>(
    ConversationOperations.Quieries.conversations, {
        onError: ({message}) => {
          toast.error(message);
        }
      }
  );

  console.log("HERE IS CONVERSATION DATA: ", conversationsData);

  return (
    <div className="flex flex-col justify-between sm:w-full md:w-80 border bg-white shadow-xl md:rounded-lg m-2">
      {/* Skeleton Loader */}
      <ConversationList session={session} conversations={conversationsData?.conversations || []}/>
      <SignOutButton />
    </div>
  );
};

export default ConversationsWrapper;
