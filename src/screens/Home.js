import React, {useEffect} from 'react';

import {Text, View, FlatList, RefreshControl, StyleSheet} from 'react-native';

import {useGet} from '../hooks/useRestful';
import MovieListItem from '../component/MovieListItem';

const styles = StyleSheet.create({
  root: {
    paddingBottom: 32,
  },
  title: {
    fontSize: 18,
    padding: 4,
    fontWeight: 'bold',
  },
});

const Home = () => {
  const {loading, data, run} = useGet({
    url: '/discover/movie?sort_by=popularity.desc',
  });

  useEffect(() => {
    run();
  }, []);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Now In Theatres</Text>
      <FlatList
        data={data?.results}
        renderItem={({item}) => <MovieListItem data={item} />}
        keyExtractor={item => item.id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={run} />}
      />
    </View>
  );
};

export default Home;
