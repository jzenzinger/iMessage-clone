import { SearchedUser } from "@/util/types";

interface ParticipantsProps {
  participants: Array<SearchedUser>;
  removeParticipants: (userId: string) => void;
}

const ParticipantsList: React.FC<ParticipantsProps> = ({
  participants,
  removeParticipants,
}) => {
  return (
    <div className="flex w-full flex-wrap">
      {participants.map((participant) => (
        <div className="flex flex-row items-center rounded-md bg-gray-700 px-2 py-2 m-1" key={participant.id}>
          <p className="px-2 text-sm">{participant.username}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            onClick={() => removeParticipants(participant.id)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default ParticipantsList;
