import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'JUL', '2023': 42, '2024': null },
  { month: 'AUG', '2023': 43, '2024': null },
  { month: 'OCT', '2023': 44, '2024': null },
  { month: 'NOV', '2023': 43, '2024': null },
  { month: 'DEC', '2023': 44, '2024': null },
  { month: 'JAN', '2023': null, '2024': 48 },
  { month: 'FEB', '2023': null, '2024': 52 },
  { month: 'MAR', '2023': null, '2024': 54 },
  { month: 'APR', '2023': null, '2024': 54 },
  { month: 'JUN', '2023': null, '2024': 54 },
  { month: 'JUL', '2023': null, '2024': 58 },
  { month: 'AUG', '2023': null, '2024': 61 },
];

const MonthlyBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <XAxis dataKey="month" />
        <Tooltip />
        <Bar dataKey="2023" fill="#0D1117" />
        <Bar dataKey="2024" fill="#1B263B" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyBarChart;
