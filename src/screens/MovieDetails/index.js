import React, {useEffect} from 'react';

import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

import Cover from './Cover';
import Header from './Header';
import Content from './Content';

import {useGet} from '../../hooks/useRestful';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  indicator: {
    marginTop: 50,
  },
});

const MovieDetails = ({id}) => {
  const {loading: getMovieLoading, data: movieData, run: runGetMovie} = useGet({
    url: `/movie/${id}`,
  });

  const {loading: getCaseLoading, data: castData, run: runGetCast} = useGet({
    url: `/movie/${id}/credits`,
  });

  useEffect(() => {
    return (async () => {
      await runGetMovie();
      await runGetCast();
    })();

    // eslint-disable-next-line
  }, []);

  const translationY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.y;
  });

  return (
    <View style={styles.root}>
      {getMovieLoading || getCaseLoading ? (
        <ActivityIndicator
          size="large"
          color="#3F51B5"
          style={styles.indicator}
        />
      ) : (
        <>
          <Cover
            translationY={translationY}
            img={movieData && movieData.backdrop_path}
          />
          <Header translationY={translationY} data={movieData} />
          <Content
            data={movieData}
            castData={castData?.cast}
            translationY={translationY}
            scrollHandler={scrollHandler}
          />
        </>
      )}
    </View>
  );
};

export default MovieDetails;
