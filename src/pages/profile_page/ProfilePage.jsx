import React, { useState } from 'react';
import ProfileSelector from '../../components/ProfileSelector';
import ProfileFactory from '../../factories/ProfileFactory';

const ProfilePage = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleProfileSelection = (profile) => {
    setSelectedProfile(profile);
  };

  const ProfileComponent = ProfileFactory(selectedProfile);

  return (
    <div className="profile-page">
      {selectedProfile ? <ProfileComponent /> : <ProfileSelector onSelectProfile={handleProfileSelection} />}
    </div>
  );
};

export default ProfilePage;
