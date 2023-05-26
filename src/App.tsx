import 'react-native-url-polyfill/auto';
import {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Session} from '@supabase/supabase-js';
import {supabase} from './services/supabase';
import EncryptedStorage from 'react-native-encrypted-storage';

import Login from './screens/Login';
import Dashboard from './screens/Dashboard';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View>
      {session && session.user ? (
        <Dashboard key={session.user.id} session={session} />
      ) : (
        <Login />
      )}
    </View>
  );
}
