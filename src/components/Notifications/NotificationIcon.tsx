import { NotificationType } from '@/types/notifications';
import { Handshake, UmbrellaIcon } from 'lucide-react';
import { HiCake, HiDatabase, HiFolder, HiSpeakerphone } from 'react-icons/hi';
import { SiLimesurvey } from 'react-icons/si';
import { HiArrowTrendingUp, HiUsers } from 'react-icons/hi2';
import { MdOutlineSick } from 'react-icons/md';
interface Props {
  type: NotificationType;
}

const NotificationIcon = ({ type }: Props) => {
  switch (type) {
    case NotificationType.Announcement:
      return (
        <div className="bg-gray-100 text-black border-[1px] rounded-full size-12 flex items-center justify-center shrink-0 grow-0">
          <HiSpeakerphone size={22} />
        </div>
      );
    case NotificationType.Birthday:
      return (
        <div className="bg-gray-100 text-black border-[1px] rounded-full size-12 flex items-center justify-center shrink-0 grow-0">
          <HiCake size={22} />
        </div>
      );
    case NotificationType.Evaluation:
      return (
        <div className="bg-gray-100 text-black border-[1px] rounded-full size-12 flex items-center justify-center shrink-0 grow-0">
          <HiArrowTrendingUp size={22} />
        </div>
      );
    case NotificationType.Survey:
      return (
        <div className="bg-gray-100 text-black border-[1px] rounded-full size-12 flex items-center justify-center shrink-0 grow-0">
          <SiLimesurvey size={22} />
        </div>
      );
    case NotificationType.LeaveTime:
      return (
        <div className="bg-[#25a244] text-white rounded-full size-12 flex items-center justify-center shrink-0 grow-0">
          <UmbrellaIcon size={22} />
        </div>
      );
    case NotificationType.NewFile:
      return (
        <div className="bg-gray-100 text-black border-[1px] rounded-full size-12 flex items-center justify-center shrink-0 grow-0">
          <HiFolder size={22} />
        </div>
      );
    case NotificationType.NewHire:
      return (
        <div className="bg-gray-100 text-black border-[1px] rounded-full size-12 flex items-center justify-center shrink-0 grow-0">
          <Handshake size={22} />
        </div>
      );
    case NotificationType.NewManager:
      return (
        <div className="bg-gray-100 text-black border-[1px] rounded-full size-12 flex items-center justify-center shrink-0 grow-0">
          <HiUsers size={22} />
        </div>
      );
    case NotificationType.SickLeave:
      return (
        <div
          style={{ background: '#F53649' }}
          className="bg-black text-white rounded-full size-12 flex items-center justify-center shrink-0 grow-0"
        >
          <MdOutlineSick />
        </div>
      );
    case NotificationType.System:
      return (
        <div className="bg-gray-100 text-black border-[1px] rounded-full size-12 flex items-center justify-center shrink-0 grow-0">
          <HiDatabase size={22} />
        </div>
      );
    default:
      return null;
  }
};

export default NotificationIcon;
