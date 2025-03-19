import cn from '@/utils/class-names';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  icon?: React.ReactNode;
  bg?: string;
  textColor?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  name,
  icon,
  bg,
  textColor,
  className,
  type = 'button', // Default type is 'button'
  ...props
}) => {
  return (
    <button
      type={type}
      style={{
        background: bg || undefined,
        color: textColor || undefined,
      }}
      className={cn(
        'px-4 py-2 bg-[#0F172A] text-white  rounded flex gap-2 items-center justify-center text-sm border-[1px] border-[#E8E8E8] whitespace-normal md:whitespace-nowrap',
        className
      )}
      {...props} // Spread all other button props
    >
      {name}
      {icon}
    </button>
  );
};

export default Button;
