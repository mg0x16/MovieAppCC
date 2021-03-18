import React, {useMemo} from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  Button,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {useConfigs} from '../context/Configs';

const styles = StyleSheet.create({
  root: {
    elevation: 4,
    marginBottom: 16,
    paddingLeft: 4,
    paddingRight: 4,
    flexDirection: 'row',
  },
  image: {
    width: 120,
    height: 150,
  },
  infoContainer: {
    padding: 6,
  },
});

const MovieListItem = ({data} = {}) => {
  const {imageUrlBase} = useConfigs();

  const isFavourite = useMemo(() => {
    return Math.random() > 0.5 ? true : false;
  }, []);

  return (
    <TouchableNativeFeedback
      onPress={() => {
        Navigation.push('MAIN_STACK', {
          component: {
            name: 'MovieDetailsScreen',
            passProps: {
              id: data.id,
            },
          },
        });
      }}>
      <View style={styles.root}>
        <Image
          source={{
            uri: `${imageUrlBase}${data.poster_path}`,
          }}
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <Text>Title: {data.title}</Text>
          <Text>Release Date: {data.release_date}</Text>
          <Text>Language: {data.original_language}</Text>
          <Text>Vote: {data.vote_average}</Text>
          {isFavourite ? (
            <Button
              onPress={() => {
                alert('remove from fav');
              }}
              title="Remove From Fav"
            />
          ) : (
            <Button
              onPress={() => {
                alert('add to fav');
              }}
              title="Add To Fav"
            />
          )}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default MovieListItem;
