import React from 'react';

import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import {useConfigs} from '../context/Configs';
import FavouriteButton from './FavouriteButton';

const styles = StyleSheet.create({
  root: {
    marginBottom: 16,
    paddingLeft: 10,
    paddingRight: 10,
    padding: 10,
    flexDirection: 'row',
  },
  image: {
    width: 108,
    height: 160,
    borderRadius: 8,
    elevation: 3,
  },
  infoContainer: {
    padding: 6,
    flex: 1,
  },
  infoTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  desc: {
    fontSize: 14,
    color: '#999',
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  vote_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vote_text: {
    color: '#e4bb24',
    marginLeft: 4,
    fontSize: 15,
  },
  lang: {
    textTransform: 'uppercase',
    fontSize: 12,
    color: 'gray',
  },
  favButtonContainer: {
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  divider: {
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    marginVertical: 4,
  },
});

const MovieListItem = ({data} = {}) => {
  const {imageUrlBase} = useConfigs();

  return (
    <TouchableNativeFeedback
      onPress={() => {
        Navigation.push('MAIN_STACK', {
          component: {
            name: 'MovieDetailsScreen',
            passProps: {
              id: data.id,
            },
            options: {
              topBar: {
                title: {
                  text: data.title,
                },
              },
            },
          },
        });
      }}>
      <View style={styles.root}>
        <FastImage
          style={styles.image}
          source={{
            uri: `${imageUrlBase}${data.poster_path}`,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.infoContainer}>
          <View style={styles.infoTextContainer}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.desc} numberOfLines={2}>
              {data.overview}
            </Text>
            <View style={styles.vote_container}>
              <Icon name="ios-star" size={18} color="#e4bb24" />
              <Text style={styles.vote_text}>{data.vote_average}</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.date}>Release Date: {data.release_date}</Text>
            <Text style={styles.lang}>{data.original_language}</Text>
          </View>
          <View style={styles.favButtonContainer}>
            <FavouriteButton data={data} />
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default MovieListItem;
