import { SearchedUser } from "@/util/types";

interface UserSearchListProps {
  users: Array<SearchedUser>;
  addParticipant: (user: SearchedUser) => void;
}

const UserSearchList: React.FC<UserSearchListProps> = ({
  users,
  addParticipant,
}) => {
  console.log(users);

  return (
    <div className="my-6">
      {users.length === 0 ? (
        <div className="flex mt-6 justify-center">
          <p>No users found.</p>
        </div>
      ) : (
        <>
          {users.map((user) => (
            <div
              className="flex flex-row items-center px-3 rounded-md hover:bg-gray-700 transition-colors"
              key={user.id}
            >
              <div className="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 26 26"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="flex flex-row justify-between w-full py-2 items-center">
                <p className="text-sm px-4">{user.username}</p>
                <button
                  onClick={() => addParticipant(user)}
                  className="w-1/4 text-white transition-shadow border-2 border-indigo-500 hover:bg-indigo-500 hover:shadow-xl hover:cursor-pointer font-medium rounded-lg text-sm py-2"
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default UserSearchList;
