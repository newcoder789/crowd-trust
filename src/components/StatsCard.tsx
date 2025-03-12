import React from "react";

const StatsCard: React.FC<{ title: string; value: number }> = ({ title, value }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
};

export default StatsCard;
