import React from 'react';

import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import MovieListItem from '../component/MovieListItem';

const Favourites = () => {
  const favList = useSelector(state => state.favourites.value);

  return (
    <FlatList
      data={favList}
      renderItem={({item}) => <MovieListItem data={item} />}
      keyExtractor={item => item.id}
    />
  );
};

export default Favourites;
