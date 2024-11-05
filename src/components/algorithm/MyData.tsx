import { useAtom } from 'jotai';
import Image from 'next/image';
import React from 'react';

import { useUserAlgorithmStats } from '@/api/algorithm/fetchMyAlgorithmData';
import { accessTokenAtom } from '@/store/useTokenStore';

interface Tier {
  level: number;
  name: string;
}

const MyData: React.FC = () => {
  const [accessToken] = useAtom(accessTokenAtom);

  const tierStandard: Tier[] = [
    { level: 0, name: 'unrated' },
    { level: 1, name: 'Bronze5' },
    { level: 2, name: 'Bronze4' },
    { level: 3, name: 'Bronze3' },
    { level: 4, name: 'Bronze2' },
    { level: 5, name: 'Bronze1' },
    { level: 6, name: 'Silver5' },
    { level: 7, name: 'Silver4' },
    { level: 8, name: 'Silver3' },
    { level: 9, name: 'Silver2' },
    { level: 10, name: 'Silver1' },
    { level: 11, name: 'Gold5' },
    { level: 12, name: 'Gold4' },
    { level: 13, name: 'Gold3' },
    { level: 14, name: 'Gold2' },
    { level: 15, name: 'Gold1' },
    { level: 16, name: 'Platinum5' },
    { level: 17, name: 'Platinum4' },
    { level: 18, name: 'Platinum3' },
    { level: 19, name: 'Platinum2' },
    { level: 20, name: 'Platinum1' },
    { level: 21, name: 'Diamond5' },
    { level: 22, name: 'Diamond4' },
    { level: 23, name: 'Diamond3' },
    { level: 24, name: 'Diamond2' },
    { level: 25, name: 'Diamond1' },
    { level: 26, name: 'Ruby5' },
    { level: 27, name: 'Ruby4' },
    { level: 28, name: 'Ruby3' },
    { level: 29, name: 'Ruby2' },
    { level: 30, name: 'Ruby1' },
    { level: 31, name: 'Master' },
  ];

  const { data, isLoading } = useUserAlgorithmStats(accessToken);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No data available</p>;
  }

  const { username, rating, rank, profileImageUrl, tier } = data;
  const tierName = tierStandard.find((v) => v.level === tier)?.name || 'unrated';

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 rounded-3xl border border-zinc-600 bg-zinc-700 p-5">
      <div>
        <Image
          src={profileImageUrl || '/defaultProfileImage.jpg'}
          alt="프로필 이미지"
          width={64}
          height={64}
          className="rounded-full"
        />
      </div>
      <h1>{username}</h1>
      <div className="flex w-full flex-col items-start justify-center gap-4 px-5">
        <p>
          {tierName} {rating}
        </p>
        <p>Rank: {rank}</p>
      </div>
    </div>
  );
};

export default MyData;
