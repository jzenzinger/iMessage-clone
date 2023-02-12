import { signOut } from "next-auth/react";

interface IChatProps {}

const Chat: React.FC<IChatProps> = (props) => {
  return (
    <div>
      Chat
      <a
        href="#"
        onClick={() => signOut()}
        className="m-4 bg-indigo-600 rounded text-white duration-150 hover:bg-indigo-700 active:shadow-lg font-medium inline-flex items-center gap-x-1 px-4 py-2"
      >
        Sign Out
      </a>
    </div>
  );
};

export default Chat;
