import {useState, useEffect} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Button, Input, Text} from '@rneui/themed';
import {Session} from '@supabase/supabase-js';
import {Icon} from '@rneui/themed';

import AlpacaOrLlama from './AlpacaOrLlama';
import Profile from './Profile';
import {colors} from '../theme';

export default function Dashboard({session}: {session: Session}) {
  const [currentScreen, setCurrentScreen] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.ctaContainer}>
        <Button
          onPress={() => setCurrentScreen('Profile')}
          buttonStyle={{backgroundColor: colors.accent_peach}}
          containerStyle={[
            styles.navButton,
            {backgroundColor: colors.accent_peach},
          ]}>
          <Icon name="user" color="black" type="font-awesome-5" solid />
        </Button>
        <Button
          onPress={() => setCurrentScreen('AlpacaOrLlama')}
          buttonStyle={{backgroundColor: colors.coolest_purple}}
          containerStyle={[
            styles.navButton,
            {backgroundColor: colors.coolest_purple},
          ]}>
          <Icon name="gamepad" color="black" type="font-awesome-5" />
        </Button>
      </View>
      {currentScreen === 'AlpacaOrLlama' ? (
        <AlpacaOrLlama />
      ) : (
        <Profile session={session} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 90,
    padding: 12,
    flex: 1,
    backgroundColor: colors.pale_peach,
  },
  navButton: {
    borderRadius: 50,
    borderWidth: 3,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
