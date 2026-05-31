import React from 'react';
import type { CfUserInfo } from '../../../types/codeforces';

interface UserInfoCardProps {
  userInfo: CfUserInfo;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ userInfo }) => (
  <div className="flex bg-cf-gray dark:bg-cf-gray-light rounded-lg p-4 sm:p-6 shadow-cf text-center">
    <div>

      <img
        src={userInfo.titlePhoto}
        alt="Avatar"
        className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full mb-4"
      />
    </div>
    <div className='flex-1 flex-col'>

      <h1 className="text-2xl sm:text-3xl font-bold text-cf-blue dark:text-cf-blue-light">
        {userInfo.handle}
      </h1>
      <p className="text-cf-text dark:text-cf-text-light text-sm sm:text-base">
        {userInfo.rank} ({userInfo.rating})
      </p>
      <p className="text-cf-text dark:text-cf-text-light text-sm sm:text-base">
        Max: {userInfo.maxRank} ({userInfo.maxRating})
      </p>
    </div>
  </div>
);

export default UserInfoCard;
