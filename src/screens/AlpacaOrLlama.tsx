import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text, Image} from '@rneui/themed';
import {useQuery} from '@tanstack/react-query';

import {getAlpacas, getLlamas} from '../services/unslpash';
import {colors} from '../theme';

const AlpacaOrLlama = () => {
  const [counter, setCounter] = React.useState(0);

  const {
    isLoading: isLoadingAlpacas,
    isError: isErrorAlpacas,
    data: alpacas,
    error: alpacasError,
  } = useQuery({
    queryKey: ['alpacas'],
    queryFn: getAlpacas,
  });

  const {
    isLoading: isLoadingLlamas,
    isError: isErrorLlamas,
    data: llamas,
    error: llamasError,
  } = useQuery({
    queryKey: ['llamas'],
    queryFn: getLlamas,
  });

  const currentImage = React.useMemo(() => {
    if (!llamas || !alpacas) return null;

    const data = {
      alpaca: alpacas,
      llama: llamas,
    };

    const keys = Object.keys(data);

    const type = keys[
      Math.floor(Math.random() * keys.length)
    ] as keyof typeof data;

    const randomArray = data[type];
    const randomItem =
      randomArray[Math.floor(Math.random() * randomArray.length)];

    return {
      type,
      url: randomItem?.urls?.thumb || null,
    };
  }, [counter, isLoadingAlpacas, isLoadingLlamas]);

  if (isLoadingAlpacas || isLoadingLlamas) {
    return <Text>Loading...</Text>;
  }

  if (isErrorAlpacas || isErrorLlamas) {
    isErrorAlpacas && console.log('alpaca query err: ', alpacasError);
    isErrorLlamas && console.log('llama query err: ', llamasError);
    return <Text>Something wrong</Text>;
  }

  return (
    <View style={styles.container}>
      <Text h3 style={styles.heading}>
        Is this an alpaca or a llama?
      </Text>
      <Image
        source={{uri: currentImage?.url}}
        containerStyle={styles.imageContainer}
        resizeMode="contain"
      />
      <View style={styles.ctaContainer}>
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={() => {
            setCounter(
              currentImage?.type === 'alpaca' ? counter + 1 : counter - 1,
            );
          }}>
          Alpaca
        </Button>
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={() => {
            setCounter(
              currentImage?.type === 'llama' ? counter + 1 : counter - 1,
            );
          }}>
          Llama
        </Button>
      </View>
      <Text h3 style={styles.heading}>
        score: {counter}
      </Text>
    </View>
  );
};

export default AlpacaOrLlama;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: 'center',
    flex: 1,
    paddingBottom: 40,
  },
  heading: {
    marginBottom: 16,
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    flex: 10,
    marginBottom: 48,
  },
  ctaContainer: {
    width: '100%',
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 8,
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
