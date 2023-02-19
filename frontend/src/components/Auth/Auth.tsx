import { signIn } from "next-auth/react";
import { Session } from "next-auth";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import UserOperations from "../../graphql/operations/user";
import { CreateUsernameData, CreateUsernameVariables } from "@/util/types";
import toast from "react-hot-toast";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState("");

  const [createUsername, { loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUsername);

  const onSubmit = async () => {
    if (!username) return;
    try {
      const { data } = await createUsername({ variables: { username } });

      if (!data?.createUsername) {
        throw new Error();
      }

      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;

        throw new Error(error);
      }

      toast.success("Username successfully created! ❤️");

      /**
       * Reload session to obtain new username
       */
      reloadSession();
    } catch (error: any) {
      toast.error(error?.message);
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
