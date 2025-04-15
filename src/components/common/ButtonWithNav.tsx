import Link from 'next/link';
import { GoArrowUpRight } from 'react-icons/go';

type ButtonWithNavProps = {
  href: string;
  label: string;
};

const ButtonWithNav = ({ href, label }: ButtonWithNavProps) => {
  return (
    <Link href={href}>
      <button className='flex items-center gap-2 border border-black text-black bg-white hover:bg-black hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200'>
        {label}
        <GoArrowUpRight size={20} />
      </button>
    </Link>
  );
};

export default ButtonWithNav;
