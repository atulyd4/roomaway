/* eslint-disable no-undef */
import React from 'react';
import { useSelector } from 'react-redux';
import ProfileCard from './profilecard';

function Profile() {
  const user = useSelector((s) => s.auth.user);

  return (
    <ProfileCard user={user} />
  );
}
export default Profile;
