import { signOut } from "next-auth/react";

const SignOutButton: React.FC = ({}) => {
  return (
    <div className="mb-2 mt-4 mx-auto">
      <button
        className="flex flex-row items-center transition-colors border-2 border-indigo-700 hover:bg-indigo-700 hover:text-white
        hover:cursor-pointer font-medium rounded-md px-4 py-[7px]"
        onClick={() => signOut()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 22 22"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>

        <span>Logout</span>
      </button>
    </div>
  );
};

export default SignOutButton;
