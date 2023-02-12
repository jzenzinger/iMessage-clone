import { signIn } from "next-auth/react";
import { Session } from "next-auth";
import { useState } from "react";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState("");

  const onSubmit = async () => {
    try {
        /**
         * TODO: createUsername mutation to send our username to Grapqhl API
         */
    } catch (error) {
        console.log("onSubmit error:  ", error);
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          {session ? (
            <div className="mt-8 space-y-5">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Create a Username
              </h3>
              <input
                type="text"
                required
                placeholder="Enter a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              <a
                href="#"
                onClick={onSubmit}
                className="m-8 bg-indigo-700 rounded text-white duration-150 hover:bg-indigo-700 active:shadow-lg font-medium inline-flex items-center gap-x-1 px-5 py-2"
              >
                Save
              </a>
            </div>
          ) : (
            <>
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                MessengerQL
              </h3>
              <a
                href="#"
                onClick={() => signIn("google")}
                className="m-8 bg-indigo-600 rounded text-white duration-150 hover:bg-indigo-700 active:shadow-lg font-medium inline-flex items-center gap-x-1 px-4 py-2"
              >
                Continue with Google
              </a>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Auth;
