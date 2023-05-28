import {useState, useEffect} from 'react';
import {supabase} from '../services/supabase';
import {StyleSheet, View, Alert, TextInput} from 'react-native';
import {Button, Text} from '@rneui/themed';
import {Session} from '@supabase/supabase-js';
import {colors} from '../theme';

export default function Account({session}: {session: Session}) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
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
        setUsername(data.username);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({username}: {username: string}) {
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
  }

  return (
    <View style={styles.container}>
      <Text h2>Profile</Text>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          placeholder="email"
          value={session?.user?.email}
          editable={false}
          style={[styles.input, {color: 'grey'}]}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          placeholder="username"
          value={username || ''}
          onChangeText={text => setUsername(text)}
          style={styles.input}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() => updateProfile({username})}
          disabled={loading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          title="Sign Out"
          onPress={() => supabase.auth.signOut()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    height: 42,
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 2,
  },
  button: {
    paddingVertical: 12,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 4,
    borderBottomWidth: 5,
    borderBottomColor: 'black',
    borderTopColor: 'black',
    borderLeftColor: 'black',
    borderRightColor: 'black',
    backgroundColor: colors.yellow,
  },
  buttonTitle: {
    color: 'black',
  },
});
