import { SearchedUser, SearchUsersData, SearchUsersInput } from "@/util/types";
import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import UserOperations from "../../../../graphql/operations/user";
import ParticipantsList from "./Participants";
import UserSearchList from "./UserSearchList";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConversationModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [participants, setParticipants] = useState<Array<SearchedUser>>([]);

  // Lazy Query - we define when is this query fired up
  const [searchUsers, { data, loading, error }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInput
  >(UserOperations.Quieries.searchUsers);

  console.log("HERE IS SEARCH DATA: ", data);

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
                <h3 className="mb-4 text-xl font-medium text-white">
                  Create New Conversation
                </h3>
                <form className="space-y-6" onSubmit={onSubmit}>
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="border border-gray-800 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 placeholder-gray-400"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!username}
                    className="w-full text-white transition-shadow bg-indigo-500 hover:shadow-xl hover:cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Search
                  </button>
                </form>
                {data?.searchUsers && (
                  <UserSearchList
                    users={data.searchUsers}
                    addParticipant={addParticipant}
                  />
                )}
                {participants.length !== 0 && (
                  <ParticipantsList
                    participants={participants}
                    removeParticipants={removeParticipant}
                  />
                )}
                {/* VIDEO RealtimeChapApp P2 => 1:16:44 */}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ConversationModal;
