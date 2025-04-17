import { Info } from 'lucide-react';
import { useState } from 'react';

type InfoTooltipProps = {
  text: string;
};

const InfoTooltip: React.FC<InfoTooltipProps> = ({ text }) => {
  const [show, setShow] = useState(false);

  return (
    <div className='relative inline-block text-left'>
      <div
        className='cursor-pointer'
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <Info className='w-5 h-5 text-gray-500' />
      </div>
      {show && (
        <div className='absolute left-full top-[10%] ml-1  w-52 rounded-lg bg-gray-800 text-white text-[12px] p-2 shadow-lg z-50'>
          {text}
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;
