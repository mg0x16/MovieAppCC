import React from 'react';
import {Navigation} from 'react-native-navigation';

import {Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  interpolateColor,
} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

import {MIN_HEADER_HEIGHT, HEADER_DELTA} from './constants';

import {useConfigs} from '../../context/Configs';

const AnimatedImage = Animated.createAnimatedComponent(FastImage);
const AnimatedText = Animated.createAnimatedComponent(Text);

const styles = StyleSheet.create({
  root: {
    height: MIN_HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  imageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 8,
    flex: 1,
  },
});

const Header = ({data, translationY}) => {
  const {imageUrlBase} = useConfigs();

  const containerAnimatedStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translationY.value,
      [HEADER_DELTA + 70, HEADER_DELTA],
      ['rgba(63,81,181, 1)', 'rgba(63,81,181,0)'],
    );

    return {backgroundColor};
  });

  const titleAnimatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationY.value,
      [HEADER_DELTA + 70, HEADER_DELTA],
      [1, 0],
      Extrapolate.CLAMP,
    );

    return {opacity};
  });

  const imageAnimatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(
      translationY.value,
      [HEADER_DELTA + 70, HEADER_DELTA],
      [1, 0],
      Extrapolate.CLAMP,
    );

    return {
      transform: [
        {
          scale,
        },
      ],
    };
  });

  if (!data) return null;

  return (
    <Animated.View style={[styles.root, containerAnimatedStyles]}>
      <TouchableNativeFeedback
        testID="MovieDetailsBackButton"
        onPress={() => {
          Navigation.pop('MAIN_STACK');
        }}>
        <Icon name="ios-arrow-back-outline" size={26} color="white" />
      </TouchableNativeFeedback>

      <AnimatedImage
        style={[styles.imageAvatar, imageAnimatedStyles]}
        source={{
          uri: `${imageUrlBase}${data.poster_path}`,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <AnimatedText style={[styles.title, titleAnimatedStyles]}>
        {data.title}
      </AnimatedText>
    </Animated.View>
  );
};

export default Header;
