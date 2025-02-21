import React from 'react';

interface LabelWithIconProps {
    title: string;
    icon: React.ReactNode;
    iconStyles?: string;
    classNames?: string;
}

const LabelWithIcon: React.FC<LabelWithIconProps> = ({ title, icon, iconStyles = '', classNames = '' }) => {
    return (
        <div className={`${classNames} flex items-center gap-2`}>
            <div className={`flex items-center justify-center rounded-full p-1 ${iconStyles}`}>
                {icon}
            </div>
            <p className="text-sm text-dark-navy font-[500]">
                {title}
            </p>
        </div>
    );
};

export default LabelWithIcon;
