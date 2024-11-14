import { ReactNode } from "react";
interface FormHeadingProps {
    text: string,
    icon: ReactNode,
    classNames?: string;
}

const FormHeading: React.FC<FormHeadingProps> = ({ icon, text, classNames = '' }) => {
    return (
        <div className={`${classNames} flex gap-1.5 items-center`}>
            {icon}
            <h2 className='text-dark-navy text-sm font-[500]'>{text}</h2>
        </div>)
};
export default FormHeading;