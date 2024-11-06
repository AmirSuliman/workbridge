import React from 'react';

const Button = ({
  name,
  icon,
  bg,
  textColor,
  classNames
}: {
  name: string;
  icon: React.ReactNode;
  bg?: string;
  textColor?: string;
  classNames?: string;
}) => {
  return (
    <button
      style={{
        background: `${bg}`,
        color: `${textColor}`,
      }}
      className={` ${classNames} px-4 py-2 bg-black text-white rounded flex gap-2 items-center justify-center text-sm border-[1px] border-[#E8E8E8] whitespace-normal md:whitespace-nowrap`}
    >
      {name}
      {icon}
    </button>
  );
};
export default Button;
