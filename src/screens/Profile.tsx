import {StyleSheet, View, TextInput} from 'react-native';
import {Button, Text} from '@rneui/themed';
import {colors} from '../theme';
import useAuth from '../context/Auth';
import useProfile from '../hooks/useProfile';

const Profile = () => {
  const {logout} = useAuth();
  const {setProfile, updateProfile, profile, loading} = useProfile();

  return (
    <View style={styles.container}>
      <Text h2>Profile</Text>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          placeholder="email"
          value={profile?.email}
          editable={false}
          style={[styles.input, {color: 'grey'}]}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          placeholder="username"
          value={profile?.username}
          onChangeText={username =>
            setProfile(profile => ({...profile, username}))
          }
          style={styles.input}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() => updateProfile({username: profile.username})}
          disabled={loading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          title="Sign Out"
          onPress={logout}
        />
      </View>
    </View>
  );
};

export default Profile;

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
