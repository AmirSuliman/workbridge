import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const SimpleBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Applicants" fill="#222222" barSize={60} />
        <Bar dataKey="Rejected" fill="#F53649" barSize={60} />
        <Bar dataKey="Interviewed" fill="#36A5F5" barSize={60} />
        <Bar dataKey="Offers Extended" fill="#F5B236" barSize={60} />
        <Bar dataKey="Employees Hired" fill="#00B87D" barSize={60} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleBarChart;
