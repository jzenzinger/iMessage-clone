import { signIn } from "next-auth/react";
import { Session } from "next-auth";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import UserOperations from "../../graphql/operations/user";
import { CreateUsernameData, CreateUsernameVariables } from "@/util/types";
import toast from "react-hot-toast";
import ButtonStyled from "../UI/ButtonStyled";

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

        throw new Error("Error when creating username: " + error);
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
    <>
      <div className="h-1/6 w-min p-5">
        <p className="pb-1 font-extrabold text-6xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500">
          MessageMe
        </p>
      </div>
      <div className="h-5/6 flex justify-center items-center w-max-1/2 text-gray-600">
        <div className="text-center rounded-xl bg-white shadow-xl py-4">
          {session ? (
            <div className="p-10 space-y-6">
              <form onSubmit={onSubmit}>
                <p className="text-gray-800 text-2xl pb-6 font-bold sm:text-3xl">
                  Create a Username
                </p>
                <input
                  type="text"
                  required
                  placeholder="Enter a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full my-2 px-3 py-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                <ButtonStyled
                  handleClick={onSubmit}
                  text={"Save"}
                  styling="mt-10 px-7 py-2.5"
                />
              </form>
            </div>
          ) : (
            <div className="p-10 space-x-6">
              <h3 className="pb-16 font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-500">
                Sign In
              </h3>
              <div className="">
                <a
                  href="#"
                  onClick={() => signIn("google")}
                  className="border-2 border-indigo-600 rounded-lg text-gray-900 duration-150 hover:bg-indigo-700 hover:text-white active:shadow-lg font-medium inline-flex items-center gap-x-1 px-3 py-3"
                >
                  <img
                    src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                    className="px-1 w-8"
                    alt="google logo"
                  />
                  Continue with Google
                </a>
                <div className="mt-24 text-gray-600 px-12 text-center">
                  <p className="text-xs text-start">
                    By proceeding, you agree to our{" "}
                    <a href="#" className="underline">
                      Terms of Use
                    </a>
                    . <br />
                    This site is protected by reCAPTCHA and the{" "}
                    <a href="#" className="underline">
                      Google Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="#" className="underline">
                      Terms of Service
                    </a>{" "}
                    apply.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Auth;
