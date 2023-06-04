import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {Session} from '@supabase/supabase-js';
import {supabase} from '../lib/supabase';
import {Alert} from 'react-native';

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  error?: any;
  login: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Export the provider as we need to wrap the entire app with it
export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  // Check if there is a currently active session
  // when the provider is mounted for the first time.
  //
  // If there is an error, it means there is no session.
  //
  // Finally, just signal the component that the initial load
  // is over.

  useEffect(() => {
    setError('');
    supabase.auth
      .getSession()
      .then(({data: {session}}) => {
        setSession(session);
      })
      .catch(error => {
        setError(error.message);
        Alert.alert(error.message);
      })
      .finally(() => {
        setLoadingInitial(false);
      });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // Flags the component loading state and posts the login
  // data to the server.
  //
  // An error means that the email/password combination is
  // not valid.
  //
  // Finally, just signal the component that loading the
  // loading state is over.

  const login = async (email: string, password: string) => {
    setLoading(true);
    const {error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
      Alert.alert(error.message);
    }
    setLoading(false);
  };

  // Sends sign up details to the server. On success we just apply
  // the created user to the state.
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    const {error} = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
      Alert.alert(error.message);
    }
    setLoading(false);
  };

  // Call the logout endpoint.
  const logout = () => {
    supabase.auth.signOut();
  };

  // Make the provider update only when it should.
  // We only want to force re-renders if the user,
  // loading or error states change.
  //
  // Whenever the `value` passed into a provider changes,
  // the whole tree under the provider re-renders, and
  // that can be very costly! Even in this case, where
  // you only get re-renders when logging in and out
  // we want to keep things very performant.
  const memoedValue = useMemo(
    () => ({
      session,
      loading,
      error,
      login,
      signUp,
      logout,
    }),
    [session, loading, error],
  );

  // We only want to render the underlying app after we
  // assert for the presence of a current user.
  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
  return useContext(AuthContext);
}
