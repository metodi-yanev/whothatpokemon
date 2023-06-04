import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {supabase} from '../lib/supabase';

import useAuth from '../context/Auth';

interface Profile {
  username: string;
  email: string;
}

const useProfile = () => {
  const {session} = useAuth();
  const [profile, setProfile] = useState<Profile>({
    username: '',
    email: session?.user.email || '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      let {data, error, status} = await supabase
        .from('profiles')
        .select('username')
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setProfile({
          username: data.username,
          email: session?.user?.email || '',
        });
      }
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
      if (!session?.user) throw new Error('No user on the session!');

      const updates = {
        id: session?.user.id,
        username,
        updated_at: new Date(),
      };

      let {error} = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
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
