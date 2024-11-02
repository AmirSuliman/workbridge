import React from 'react';

const BlackButton = ({
  name,
  icon,
}: {
  name: string;
  icon: React.ReactNode;
}) => {
  return (
    <button className="px-4 py-2 bg-black text-white rounded flex gap-2 items-center justify-center text-sm">
      {name}
      {icon}
    </button>
  );
};
export default BlackButton;
