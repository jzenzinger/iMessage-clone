import {
  CreateConversationData,
  CreateConversationInput,
  SearchedUser,
  SearchUsersData,
  SearchUsersInput,
} from "@/util/types";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useState, useEffect, ReactEventHandler } from "react";
import { toast } from "react-hot-toast";
import UserOperations from "../../../../graphql/operations/user";
import ConversationOperations from "../../../../graphql/operations/conversation";
import ParticipantsList from "./Participants";
import UserSearchList from "./UserSearchList";
import { Session } from "next-auth";

interface ModalProps {
  session: Session;
  isOpen: boolean;
  onClose: () => void;
}

const ConversationModal: React.FC<ModalProps> = ({
  session,
  isOpen,
  onClose,
}) => {
  const {
    user: { id: userId },
  } = session;
  const [username, setUsername] = useState("");
  const [participants, setParticipants] = useState<Array<SearchedUser>>([]);

  // Lazy Query - we define when is this query fired up
  const [searchUsers, { data, loading: SearchUsersLoading, error }] =
    useLazyQuery<SearchUsersData, SearchUsersInput>(
      UserOperations.Quieries.searchUsers
    );

  const [createConversation, { loading: createConversationLoading }] =
    useMutation<CreateConversationData, CreateConversationInput>(
      ConversationOperations.Mutations.createConversation
    );

  const onCreateConversation = async () => {
    const participantIds = [userId, ...participants.map((p) => p.id)];
    try {
      const { data } = await createConversation({
        variables: {
          participantIds,
        },
      });
    } catch (error: any) {
      console.log("onCreateConversation error: ", error);
      toast.error(error?.message);
    }
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    searchUsers({ variables: { username } });
  };

  const addParticipant = (user: SearchedUser) => {
    setParticipants((prev) => [...prev, user]);
    setUsername("");
  };

  const removeParticipant = (userId: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== userId));
  };

  useEffect(() => {
    const close = (e: any) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <div>
      {isOpen ? (
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="bg-gray-200 transition-all bg-opacity-60 backdrop-blur-sm flex justify-center items-center fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full text-white"
        >
          <div className="relative w-full h-full max-w-md md:h-auto">
            <div className="relative bg-white rounded-lg shadow-2xl dark:bg-gray-800">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-700 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={onClose}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-6 mt-2 text-xl font-medium text-white text-center">
                  Create New Conversation
                </h3>
                <form onSubmit={onSubmit}>
                  <>
                    <input
                      type="text"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="border border-gray-800 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 placeholder-gray-400"
                      placeholder="Search users by username"
                      required
                    />
                  </>
                  <button
                    type="submit"
                    disabled={!username}
                    className="w-full text-white transition-shadow bg-gray-700 hover:opacity-90 hover:cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 mt-6 text-center"
                  >
                    {SearchUsersLoading ? (
                      <div
                        className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                      >
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                          Loading...
                        </span>
                      </div>
                    ) : (
                      <span>Search</span>
                    )}
                  </button>
                </form>
                {data?.searchUsers && (
                  <UserSearchList
                    users={data.searchUsers}
                    addParticipant={addParticipant}
                  />
                )}
                {participants.length !== 0 && (
                  <>
                    <ParticipantsList
                      participants={participants}
                      removeParticipants={removeParticipant}
                    />
                    <button
                      className="w-full text-white transition-shadow bg-indigo-500 hover:opacity-90 active:opacity-90 hover:cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 mt-6 text-center"
                      onClick={onCreateConversation}
                    >
                      {createConversationLoading ? (
                        <div
                          className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                          role="status"
                        >
                          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                            Loading...
                          </span>
                        </div>
                      ) : (
                        <span>Create Conversation</span>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ConversationModal;
