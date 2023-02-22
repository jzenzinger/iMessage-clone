import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import ConversationsWrapper from "./Conversations/ConversationsWrapper";
import FeedWrapper from "./Feed/FeedWrapper";

interface ChatProps {
  session: Session;
}

const Chat: React.FC<ChatProps> = ({ session }) => {
  return (
    <div className="flex h-full">
      <ConversationsWrapper session={session} />
      <FeedWrapper session={session} />
    </div>
  );
};

export default Chat;
