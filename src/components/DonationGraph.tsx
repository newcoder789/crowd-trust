import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const donationData = [
  { month: "Jan", amount: 1.2 },
  { month: "Feb", amount: 2.3 },
  { month: "Mar", amount: 0.8 },
  { month: "Apr", amount: 3.4 },
  { month: "May", amount: 5.2 },
];

const DonationGraph = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h3 className="text-gray-600 text-sm mb-2">Donations Over Time (ETH)</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={donationData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#3182ce" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonationGraph;
