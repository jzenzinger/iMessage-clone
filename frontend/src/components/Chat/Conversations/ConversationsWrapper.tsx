import SignOutButton from "@/components/Auth/SignOutButton";
import { useQuery } from "@apollo/client";
import { Session } from "next-auth";
import ConversationList from "./ConversationList";
import ConversationOperations from "../../../graphql/operations/conversation";
import { ConversationPopulated } from "../../../../../backend/src/util/types";
import { ConversationsData } from "@/util/types";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useRouter } from "next/router";

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
    subscribeToMore,
  } = useQuery<
    ConversationsData,
    // That is apollo/client package error with current version ^3.7.7
    null
  >(ConversationOperations.Quieries.conversations, {
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const router = useRouter();

  const onViewConversation = async (conversationId: string) => {
    /**
     * TODO:
     * 1. Push the conversationId to router query params
     */
    router.push({query: { conversationId }});
    /**
     * TODO:
     * 2. Mark the conversation by its Id as read
     */
  };

  const subscribeToNewConversation = () => {
    subscribeToMore({
      document: ConversationOperations.Subscriptions.conversationCreated,
      updateQuery: (
        prev,
        {
          subscriptionData,
        }: {
          subscriptionData: {
            data: { conversationCreated: ConversationPopulated };
          };
        }
      ) => {
        if (!subscriptionData.data) return prev;

        const newConversation = subscriptionData.data.conversationCreated;

        return Object.assign({}, prev, {
          conversations: [newConversation, ...prev.conversations],
        });
      },
    });
  };

  /**
   *  Execute subscription on mount
   */
  useEffect(() => {
    subscribeToNewConversation();
  }, []);

  return (
    <div className="flex flex-col justify-between sm:w-full md:w-80 border bg-white shadow-xl md:rounded-lg m-2">
      {/* Skeleton Loader */}
      <ConversationList
        session={session}
        conversations={conversationsData?.conversations || []}
        onViewConversation={onViewConversation}
      />
      <SignOutButton />
    </div>
  );
};

export default ConversationsWrapper;
