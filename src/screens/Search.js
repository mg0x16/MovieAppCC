import React, {useState, useEffect, useCallback} from 'react';

import {
  FlatList,
  View,
  RefreshControl,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import MovieListItem from '../component/MovieListItem';
import {useGet} from '../hooks/useRestful';
import useDebounce from '../hooks/useDebounce';

const styles = StyleSheet.create({
  inputBoxContainer: {
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  searchIcon: {
    backgroundColor: 'white',
    paddingHorizontal: 6,
  },
  input: {
    backgroundColor: 'white',
    flex: 1,
    elevation: 1,
    padding: 4,
  },
});

const Search = () => {
  const [searchInputText, setSearchInputText] = useState('');

  const {loading, run, data} = useGet();

  const searchText = useDebounce(searchInputText.trim(), 500);

  const onRefresh = useCallback(() => {
    run({
      url: `/search/movie?query=${searchText}`,
    });
  }, [searchText]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  return (
    <View>
      <View style={styles.inputBoxContainer}>
        <Icon
          style={styles.searchIcon}
          name="ios-search"
          size={26}
          color="#3F51B5"
        />
        <TextInput
          testID="MovieSearchInput"
          placeholder="Search a movie..."
          value={searchInputText}
          onChangeText={setSearchInputText}
          style={styles.input}
          clearButtonMode="always"
        />
      </View>
      <FlatList
        data={data?.results}
        renderItem={({item}) => <MovieListItem data={item} />}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Search;
