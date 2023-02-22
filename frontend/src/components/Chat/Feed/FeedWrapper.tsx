import { Session } from "next-auth";

interface FeedWrapperProps {
  session: Session;
}

const FeedWrapper: React.FC<FeedWrapperProps> = ({ session }) => {
  return <div className="w-full my-2 mx-2 border-2 border-gray-300 rounded-lg">FeedWrapper</div>;
};

export default FeedWrapper;
