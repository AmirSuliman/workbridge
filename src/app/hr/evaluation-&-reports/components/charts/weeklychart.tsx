import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from 'recharts';

// Data with each segment's value

// Colors for each segment
const COLORS = [
  '#F44336',
  '#42A5F5',
  '#FFB74D',
  '#2E7D32',
  '#1C1C3A',
  '#000000',
];

const HorizontalStackedBar = ({ reportsData }) => {
  const data = [
    { name: 'Rejected Applicants', value: reportsData?.rejected || 0 },
    { name: 'Candidates Interviewed', value: reportsData?.interviewed || 0 },
    { name: 'Offers Extended', value: reportsData?.offered || 0 },
    { name: 'Employees Hired', value: reportsData?.onboarding || 0 },
    { name: 'Applicants', value: reportsData?.count || 0 },
  ];
  return (
    <div className='p-4'>
      <ResponsiveContainer width='100%' height={60}>
        <BarChart
          layout='vertical'
          data={[
            data.reduce(
              (acc, item) => ({ ...acc, [item.name]: item.value }),
              {}
            ),
          ]}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type='number' hide />
          <YAxis type='category' dataKey='name' hide />
          <Tooltip />
          <Bar
            dataKey='Rejected Applicants'
            stackId='a'
            fill={COLORS[0]}
            barSize={40}
          />
          <Bar dataKey='Candidates Interviewed' stackId='a' fill={COLORS[1]} />
          <Bar dataKey='Offers Extended' stackId='a' fill={COLORS[2]} />
          <Bar dataKey='Employees Hired' stackId='a' fill={COLORS[3]} />
          <Bar dataKey='Applicants' stackId='a' fill={COLORS[4]} />
        </BarChart>
      </ResponsiveContainer>

      <div className='flex justify-between mt-2 text-[12px] flex-wrap gap-2'>
        {data.map((entry, index) => (
          <div key={index} className='flex flex-col items-center'>
            <span>
              {entry.name} <span className='font-bold'>({entry.value})</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalStackedBar;
