import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '@rneui/themed';
import {Icon} from '@rneui/themed';

import Game from './Game';
import Profile from './Profile';
import {colors} from '../theme';

const Dashboard = () => {
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
          onPress={() => setCurrentScreen('Game')}
          buttonStyle={{backgroundColor: colors.coolest_purple}}
          containerStyle={[
            styles.navButton,
            {backgroundColor: colors.coolest_purple},
          ]}>
          <Icon name="gamepad" color="black" type="font-awesome-5" />
        </Button>
      </View>
      {currentScreen === 'AlpacaOrLlama' ? <Game /> : <Profile />}
    </View>
  );
};

export default Dashboard;

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
