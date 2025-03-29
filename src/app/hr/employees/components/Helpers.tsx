import { ReactNode } from 'react';
import cn from 'classnames';
// heading helper for different sections of form
export const Heading = ({ icon, text }: { text: string; icon: ReactNode }) => {
  return (
    <h1 className='flex items-center gap-x-2 font-medium text-lg mb-16'>
      {icon}
      {text}
    </h1>
  );
};
// label helper for form fields
export const Label = ({
  text,
  classes,
}: {
  text: string;
  classes?: string;
}) => {
  return <label className={cn('form-label', classes)}>{text}</label>;
};
