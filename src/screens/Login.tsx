import React, {useState} from 'react';
import {Alert, StyleSheet, View, TextInput, Image} from 'react-native';
import {supabase} from '../services/supabase';
import {Button, Text} from '@rneui/themed';
import {colors} from '../theme';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const {error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {error} = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/mm_logo.png')} />
      <Text h2 style={styles.heading}>{`<DevTalks />`}</Text>
      <View style={[styles.verticallySpaced]}>
        <TextInput
          placeholder="email"
          style={styles.input}
          onChangeText={text => setEmail(text)}
          value={email}
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, {marginBottom: 36}]}>
        <TextInput
          placeholder="password"
          style={styles.input}
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced]}>
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: colors.pale_peach,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    marginBottom: 48,
  },
  logo: {
    width: 125,
    height: 125,
    borderWidth: 2,
    borderRadius: 25,
    marginBottom: 16,
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
