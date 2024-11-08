import React from 'react';

interface ProfileCardProps {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    iconStyles?: string;
    buttonText: string;
    daysCount: number;
    onButtonClick?: () => void;
}

const VacationsCard: React.FC<ProfileCardProps> = ({
    title,
    subtitle,
    icon,
    buttonText,
    iconStyles = "",
    daysCount,
    onButtonClick,
}) => {
    return (
        <div className="flex items-center justify-between border border-gray-border rounded-[10px] bg-white p-6 gap-[3.3rem] max-w-[38rem] flex-1">
            <div className="flex flex-col justify-between gap-[2rem]">
                <div>
                    <div className="flex gap-2 items-center mb-2">
                        <div className={`flex items-center justify-center rounded-full p-1  ${iconStyles}`}>
                            {icon}
                        </div>
                        <h3 className="text-dark-navy font-[500] text-sm">{title}</h3>
                    </div>
                    <p className="font-[400] text-[#878b94] text-xs">{subtitle}</p>
                </div>
                <button
                    onClick={onButtonClick}
                    className="text-white bg-dark-navy py-1 min-w-[13rem] rounded-[4px] font-[200] text-sm "
                >
                    {buttonText}
                </button>
            </div>

            <div className="flex flex-col border border-gray-border items-center justify-center rounded-[7px] h-full px-4 ">
                <span className="text-3xl text-dark-navy font-[400]">{daysCount}</span>
                <span className="text-xs text-dark-navy">days</span>
            </div>
        </div>
    );
};

export default VacationsCard;
