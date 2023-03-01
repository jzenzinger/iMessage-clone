import { Session } from "next-auth";
import { useRouter } from "next/router";

interface FeedWrapperProps {
  session: Session;
}

const FeedWrapper: React.FC<FeedWrapperProps> = ({ session }) => {
  const router = useRouter();

  const { conversationId } = router.query;


  return (
    <div className="md:flex md:flex-col w-full my-2 mx-2 bg-white shadow-2xl rounded-lg">
      <div className="m-2">
        {conversationId ? (
          <>
            {conversationId}
          </>
        ) : (
          <div className="text-center">
            <p className="text-xl">No conversations selected yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedWrapper;
