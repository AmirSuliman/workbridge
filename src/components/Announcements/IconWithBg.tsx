import React from 'react';
import cn from 'classnames';
const IconWithBg = ({
  bgColor,
  icon,
  className,
}: {
  bgColor?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      style={{
        background: `${bgColor}`,
      }}
      className={cn(
        'bg-[#0F172A] text-white rounded-full size-10 flex items-center justify-center shrink-0 grow-0',
        className
      )}
    >
      {icon}
    </div>
  );
};
export default IconWithBg;
