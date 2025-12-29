import { ProfileActions } from '@/components/profile/ProfileActions';
import { RoleBasedProfile } from '@/components/profile/RoleBasedProfile';
import { getUserInfo } from '@/services/auth/getUserInfo'
import React from 'react'

const MyProfilePage = async() => {
  const data = await getUserInfo();
  return (
    <div className="max-w-5xl mx-auto space-y-8 bg-white p-6 rounded-2xl shadow-sm">
      <ProfileActions data={data} />
      <RoleBasedProfile data={data} />
    </div>
  )
}

export default MyProfilePage