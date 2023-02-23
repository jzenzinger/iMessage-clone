import { Session } from "next-auth";

interface FeedWrapperProps {
  session: Session;
}

const FeedWrapper: React.FC<FeedWrapperProps> = ({ session }) => {
  return <div className="w-full my-2 mx-2 bg-white shadow-2xl rounded-lg">FeedWrapper</div>;
};

export default FeedWrapper;
