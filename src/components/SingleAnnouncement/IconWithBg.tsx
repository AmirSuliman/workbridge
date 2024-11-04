import React from 'react';

const IconWithBg = ({
  bgColor,
  icon,
}: {
  bgColor: String;
  icon: React.ReactNode;
}) => {
  return (
    <div
      style={{
        background: `${bgColor}`,
      }}
      className="bg-black text-white rounded-full size-8 flex items-center justify-center"
    >
      {icon}
    </div>
  );
};
export default IconWithBg;
