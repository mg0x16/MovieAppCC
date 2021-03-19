import React from 'react';

import {StyleSheet} from 'react-native';

import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

import FastImage from 'react-native-fast-image';

import {useConfigs} from '../../context/Configs';
import {MAX_HEADER_HEIGHT} from './constants';

const styles = StyleSheet.create({
  root: {
    height: MAX_HEADER_HEIGHT + 16,
    ...StyleSheet.absoluteFillObject,
  },
  backCover: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});

const Cover = ({img, translationY}) => {
  const {imageUrlBase} = useConfigs();

  const stylez = useAnimatedStyle(() => {
    const scale = interpolate(
      translationY.value,
      [0, MAX_HEADER_HEIGHT],
      [1.5, 1],
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

  return (
    <Animated.View style={[styles.root, stylez]}>
      <FastImage
        style={styles.backCover}
        source={{
          uri: `${imageUrlBase}${img}`,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </Animated.View>
  );
};

export default Cover;
