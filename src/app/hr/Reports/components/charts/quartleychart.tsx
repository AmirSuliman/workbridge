import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Q1',
    Applicants: 141,
    Rejected: 100,
    Interviewed: 80,
    'Offers Extended': 60,
    'Employees Hired': 40,
  },
  {
    name: 'Q2',
    Applicants: 141,
    Rejected: 200,
    Interviewed: 220,
    'Offers Extended': 150,
    'Employees Hired': 100,
  },
  {
    name: 'Q3',
    Applicants: 40,
    Rejected: 60,
    Interviewed: 80,
    'Offers Extended': 100,
    'Employees Hired': 130,
  },
  {
    name: 'Q4',
    Applicants: 141,
    Rejected: 22,
    Interviewed: 17,
    'Offers Extended': 8,
    'Employees Hired': 3,
  },
];

const SimpleBarChart = () => {
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
