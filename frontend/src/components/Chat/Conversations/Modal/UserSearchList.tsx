import { SearchedUser } from "@/util/types";
import React from "react";

interface UserSearchListProps {
  users: Array<SearchedUser>;
  addParticipant: (user: SearchedUser) => void;
}

const UserSearchList: React.FC<UserSearchListProps> = ({
  users,
  addParticipant,
}) => {
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
              <div className="avatar placeholder">
                <div className="bg-indigo-600 text-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
                  <span className="text-2xl">{user.username.substring(0, 1)}</span>
                </div>
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
