import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const MonthlyBarChart = ({ years, chartData }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
      >
        <XAxis dataKey="month" />
        <Tooltip />
        {years.map((year, index) => (
          <Bar key={index} dataKey={year} fill="#0F172A" />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyBarChart;
