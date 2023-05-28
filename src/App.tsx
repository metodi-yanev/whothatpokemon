import 'react-native-url-polyfill/auto';
import {useState, useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {Session} from '@supabase/supabase-js';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {supabase} from './services/supabase';

import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import {colors} from './theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
});

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loadingSessions, setLoadingSession] = useState(true);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({data: {session}}) => {
        setSession(session);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoadingSession(false);
      });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (loadingSessions) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        {session && session.user ? (
          <Dashboard key={session.user.id} session={session} />
        ) : (
          <Login />
        )}
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
