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
        <div
          style={{ zIndex: 9999 }}
          className='absolute left-full top-1/2 ml-2 -translate-y-1/2 w-56 rounded-lg bg-gray-800 text-white text-sm p-2 shadow-lg z-50'
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;
