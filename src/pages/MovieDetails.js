import React, {useEffect, useMemo} from 'react';

import {Text, StyleSheet, Image, ScrollView, Button} from 'react-native';

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

  const isFavourite = useMemo(() => {
    return Math.random() > 0.5 ? true : false;
  }, []);

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
          </>
        )
      )}
    </ScrollView>
  );
};

export default MovieDetails;
