import { signOut } from "next-auth/react";

const SignOutButton: React.FC = ({}) => {
  return (
    <div className="absolute bottom-1 pb-7 left-16">
      <button
        className="flex flex-row items-center px-4 transition-shadow border-2 border-indigo-700 hover:bg-indigo-700 hover:text-white
       hover:shadow-xl hover:cursor-pointer font-medium rounded-md py-2"
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
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>

        <span>Sign Out</span>
      </button>
    </div>
  );
};

export default SignOutButton;
