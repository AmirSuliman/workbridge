'use client';
import AllPolicies from '../components/AllPolicies';
import Announcements from '../components/Announcements';

const Allannouncments = () => {
  return (
    <div className="p-6 flex flex-col gap-6 w-full">
      <AllPolicies />
      <Announcements />
    </div>
  );
};

export default Allannouncments;
