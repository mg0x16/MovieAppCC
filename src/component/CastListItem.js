import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useConfigs} from '../context/Configs';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
  },
  img: {
    width: 50,
    height: 50,
  },
  infoContainer: {
    padding: 4,
  },
});

const CastListItem = ({data}) => {
  const {imageUrlBase} = useConfigs();

  return (
    <View style={styles.root}>
      <FastImage
        style={[styles.img]}
        source={{
          uri: `${imageUrlBase}${data.profile_path}`,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{data.name}</Text>
      </View>
    </View>
  );
};

export default CastListItem;
