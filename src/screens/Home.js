import React, {useEffect} from 'react';

import {Text, View, ScrollView} from 'react-native';

import {useGet} from '../hooks/useRestful';
import MovieListItem from '../component/MovieListItem';

const Home = props => {
  const {loading, data, run} = useGet({
    url: '/discover/movie?sort_by=popularity.desc',
  });

  useEffect(() => {
    run();

    // eslint-disable-next-line
  }, []);

  return (
    <ScrollView pagingEnabled>
      <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 10}}>
        Now In Theatres
      </Text>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        data &&
        data.results.map(item => <MovieListItem key={item.id} data={item} />)
      )}
    </ScrollView>
  );
};

export default Home;
