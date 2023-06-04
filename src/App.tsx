import {View, StyleSheet} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import useAuth, {AuthProvider} from './context/Auth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
});

const Main = () => {
  const {session} = useAuth();
  return (
    <View style={styles.container}>{session ? <Dashboard /> : <Login />}</View>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
