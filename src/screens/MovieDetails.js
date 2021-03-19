import React, {useEffect, useMemo} from 'react';

import {Text, StyleSheet, Image, ScrollView, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {
  add as addToFavourites,
  remove as removeFromFavourites,
} from '../store/favouritesSlice';

import {useGet} from '../hooks/useRestful';
import {useConfigs} from '../context/Configs';

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 300,
  },
});

const MovieDetails = ({id}) => {
  const {loading, data, run} = useGet({
    url: `/movie/${id}`,
  });

  useEffect(() => {
    run();

    // eslint-disable-next-line
  }, []);

  console.log(data);

  const {imageUrlBase} = useConfigs();

  const favList = useSelector(state => state.favourites.value);
  const dispatch = useDispatch();

  const isFavourite = useMemo(() => {
    return data && favList.find(i => i.id === data.id);
  }, [favList, data]);

  return (
    <ScrollView pagingEnabled>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        data && (
          <>
            <Image
              source={{
                uri: `${imageUrlBase}${data.poster_path}`,
              }}
              style={styles.image}
            />
            <Text>Title: {data.title}</Text>
            <Text>Language: {data.original_language}</Text>
            <Text>Genres: {data.genres.map(g => g.name).join(', ')} </Text>
            <Text>Overview: {data.overview}</Text>
            <Text>Release Date: {data.release_date}</Text>
            <Text>Vote Average: {data.vote_average}</Text>
            <Text>Vote Count: {data.vote_count}</Text>

            {isFavourite ? (
              <Button
                onPress={() => {
                  dispatch(removeFromFavourites(data));
                }}
                title="Remove From Fav"
              />
            ) : (
              <Button
                onPress={() => {
                  dispatch(addToFavourites(data));
                }}
                title="Add To Fav"
              />
            )}
          </>
        )
      )}
    </ScrollView>
  );
};

export default MovieDetails;
