import Button from '@/src/components/Button';
import SingleAnnouncement from '@/src/components/SingleAnnouncement/SingleAnnouncement';
import { GiFlowerEmblem } from 'react-icons/gi';
import { HiSpeakerphone } from 'react-icons/hi';
import { IoCalendarOutline } from 'react-icons/io5';
import { PiPlusCircleBold } from 'react-icons/pi';

const page = () => {
  return (
    <main className="space-y-8">
      {/* all announcements */}
      <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] py-4 space-y-2">
        <header className="px-4 flex items-center gap-4 justify-between">
          <h1 className="flex items-center gap-4 font-semibold text-xl mb-4">
            <HiSpeakerphone />
            Announcements
          </h1>
          <Button
            name="Create Announcement"
            icon={<PiPlusCircleBold size={18} />}
            bg="black"
            textColor="white"
          />
        </header>
        <h6 className="my-2 opacity-35 font-medium text-sm px-4">This Week</h6>
        <SingleAnnouncement
          bgColor=""
          icon={<IoCalendarOutline />}
          description="Upcoming holiday on 31.12.2024 - Happy New years!"
        />
        <hr />
        <SingleAnnouncement
          bgColor=""
          icon={<IoCalendarOutline />}
          description="Upcoming holiday on 25.12.2024 - Marry Christmas!"
        />
        <hr />

        <SingleAnnouncement
          bgColor="#00B87D"
          icon={<GiFlowerEmblem />}
          description="Company Anniversary! We are celebrating 10 years with ISA Consulting."
        />
        <hr />

        <SingleAnnouncement
          bgColor="#00B87D"
          icon={<GiFlowerEmblem />}
          description="Referral benefits reward program has been updated."
        />
      </section>

      {/* Drafts */}
      <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] py-4 space-y-2">
        <h6 className="my-2 opacity-35 font-medium text-sm px-4">Drafts</h6>
        <SingleAnnouncement
          bgColor=""
          icon={<IoCalendarOutline />}
          description="No title announcement"
        />
      </section>

      {/* More Announcements */}
      <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] py-4 space-y-2">
        <h6 className="my-2 opacity-35 font-medium text-sm px-4">
          More Announcements
        </h6>
        <SingleAnnouncement
          bgColor=""
          icon={<IoCalendarOutline />}
          description="Team Building even on 11.12.2024 - Save the date!"
        />
        <hr />
        <SingleAnnouncement
          bgColor="#F53649"
          icon={<GiFlowerEmblem />}
          description="Work from home policy update - Check your emails!"
        />
      </section>
    </main>
  );
};
export default page;
