import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Animated from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';

import {useConfigs} from '../../context/Configs';

import {MAX_HEADER_HEIGHT} from './constants';

import CastListItem from '../../component/CastListItem';
import FavouriteButton from '../../component/FavouriteButton';

const AnimatedImage = Animated.createAnimatedComponent(FastImage);

const styles = StyleSheet.create({
  root: {
    marginBottom: 100,
  },
  headerPlaceHolderSpace: {
    height: MAX_HEADER_HEIGHT,
  },
  contentContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  img: {
    width: 110,
    height: 168,
    marginTop: -25,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 4,
    marginLeft: 8,
  },
  mainInfoDataContainer: {
    marginTop: 8,
    marginLeft: 6,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  vote_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vote_average_text: {
    color: '#e4bb24',
    marginLeft: 4,
    fontSize: 15,
  },
  vote_count_text: {
    color: '#333',
    marginLeft: 4,
    fontSize: 13,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  genresItem: {
    borderWidth: 1,
    borderColor: '#FF5722',
    borderStyle: 'dashed',
    marginRight: 6,
    marginBottom: 4,
    fontSize: 12,
    padding: 3,
    borderRadius: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: 4,
    color: '#666',
  },
  lang: {
    textTransform: 'uppercase',
  },
  subTitle: {
    fontSize: 16,
    marginTop: 24,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 8,
    fontWeight: 'bold',
  },
  favButtonContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginTop: -36,
  },
  overview: {
    padding: 8,
  },
  row: {
    flexDirection: 'row',
  },
});

const Content = ({data, castData, scrollHandler}) => {
  const {imageUrlBase} = useConfigs();

  return (
    <Animated.ScrollView onScroll={scrollHandler} style={{flex: 1}}>
      {data && (
        <>
          <View style={styles.headerPlaceHolderSpace} />

          <View style={styles.contentContainer}>
            <View style={styles.row}>
              <AnimatedImage
                style={[styles.img]}
                source={{
                  uri: `${imageUrlBase}${data.poster_path}`,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View style={styles.mainInfoDataContainer}>
                <Text style={styles.title}>
                  {data.title}{' '}
                  <Text style={styles.lang}>({data.original_language})</Text>
                </Text>
                <View style={styles.vote_container}>
                  <Icon name="ios-star" size={18} color="#e4bb24" />
                  <Text style={styles.vote_average_text}>
                    {data.vote_average}
                  </Text>
                  <Text style={styles.vote_count_text}>
                    ({data.vote_count})
                  </Text>
                </View>
                <View style={styles.genresContainer}>
                  {data.genres.map(g => (
                    <Text key={g.id} style={styles.genresItem}>
                      {g.name}
                    </Text>
                  ))}
                </View>
                <View style={styles.dateContainer}>
                  <Icon name="ios-calendar-outline" size={18} color="#666" />
                  <Text style={styles.dateText}>{data.release_date}</Text>
                </View>
              </View>
            </View>

            <View style={styles.favButtonContainer}>
              <FavouriteButton data={data} />
            </View>

            <Text style={styles.subTitle}>Overview</Text>
            <Text style={styles.overview}>{data.overview}</Text>
            <Text style={styles.subTitle}>Cast</Text>
            {castData
              ? castData.map(item => <CastListItem key={item.id} data={item} />)
              : null}
          </View>
        </>
      )}
    </Animated.ScrollView>
  );
};

export default Content;
