import React from 'react';
import cn from 'classnames';

const Button = ({
  name,
  icon,
  bg,
  textColor,
  classNames,
  onClick,
  className,
}: {
  name: string;
  icon?: React.ReactNode;
  bg?: string;
  textColor?: string;
  classNames?: string;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        background: `${bg}`,
        color: `${textColor}`,
      }}
      className={cn(
        'px-4 py-2 bg-black text-white rounded flex gap-2 items-center justify-center text-sm border-[1px] border-[#E8E8E8] whitespace-normal md:whitespace-nowrap',
        className
      )}
    >
      {name}
      {icon}
    </button>
  );
};
export default Button;
