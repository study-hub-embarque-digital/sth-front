import { useState } from 'react';
import ProfileSelector from '../../components/ProfileSelector';
import ProfileFactory from '../../factories/ProfileFactory';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const ProfilePage = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleProfileSelection = (profile) => {
    setSelectedProfile(profile);
  };

  const ProfileComponent = ProfileFactory(selectedProfile);

  const [, isAuthenticated, pathForRole] = useAuth();

  if (isAuthenticated()) {
    return <Navigate to={pathForRole()} />
  };

  return (
    <div className="profile-page">
      {selectedProfile ? <ProfileComponent /> : <ProfileSelector onSelectProfile={handleProfileSelection} />}
    </div>
  );
};

export default ProfilePage;
