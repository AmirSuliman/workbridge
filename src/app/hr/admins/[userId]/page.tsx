'use client';

import InfoGrid from '@/components/UserInformation/InfoGrid';
import { useState } from 'react';

const UserDetials = () => {
  const [userData, setUserData] = useState();
  return (
    <div className="">
      {/* <InfoGrid
        cols={6}
        headers={[
          'Name',
          'email',
          'status',
          'role',
          
        ]}
        values={[
          [
            `${userData?.firstName} ${userData?.lastName}`,
            `${userData?.email}`,
            `${userData?.active? 'active': 'inactive'}`,
          ],
        ]}
      /> */}
    </div>
  );
};
export default UserDetials;
