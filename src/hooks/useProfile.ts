import {useEffect, useState} from 'react';
import {Alert} from 'react-native';

interface Profile {
  username: string;
  email: string;
}

const useProfile = () => {
  const [profile, setProfile] = useState<Profile>({
    username: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      setLoading(true);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async ({username}: {username: string}) => {
    try {
      setLoading(true);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return {getProfile, setProfile, updateProfile, profile, loading};
};

export default useProfile;
