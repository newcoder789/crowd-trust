import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// const data = [
//   { name: "Successful", value: 8 },
//   { name: "Failed", value: 4 },
// ];
type state = {
  name: string,
  value: number
}


const COLORS = ["#22c55e", "#ef4444"];

const SuccessPieChart = ( { data }: { data: state[] }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h3 className="text-gray-600 text-sm mb-2">Campaign Success Rate</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={50} label>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SuccessPieChart;
