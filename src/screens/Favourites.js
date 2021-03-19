import React from 'react';

import {View, Text, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import MovieListItem from '../component/MovieListItem';

const Favourites = () => {
  const favList = useSelector(state => state.favourites.value);

  return (
    <ScrollView>
      {favList.map(item => (
        <MovieListItem key={item.id} data={item} />
      ))}
    </ScrollView>
  );
};

export default Favourites;
