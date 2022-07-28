import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { data } from "../../data";

const PieChartContent = (props) => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
      />
      <Tooltip />
    </PieChart>
  );
};

export default PieChartContent;
