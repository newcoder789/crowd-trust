import { CheckBadgeIcon } from "@heroicons/react/24/solid";

const VerifiedBadge = () => {
  return (
    <span className="ml-2 inline-flex items-center px-2 py-1 text-sm font-semibold text-white bg-blue-500 rounded-full">
      <CheckBadgeIcon className="w-4 h-4 mr-1" /> Verified NGO
    </span>
  );
};

export default VerifiedBadge;