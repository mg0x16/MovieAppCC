import React, {useState, useEffect} from 'react';

import {ScrollView, Text, TextInput, StyleSheet} from 'react-native';

import MovieListItem from '../component/MovieListItem';
import {useGet} from '../hooks/useRestful';
import useDebounce from '../hooks/useDebounce';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 6,
    borderRadius: 6,
  },
});

const Search = () => {
  const [searchInputText, setSearchInputText] = useState('');

  const {loading, run, data} = useGet();

  const searchText = useDebounce(searchInputText, 500);

  useEffect(() => {
    run({
      url: `/search/movie?query=${searchText}`,
    });
  }, [searchText]);

  return (
    <ScrollView>
      <TextInput
        placeholder="Search..."
        value={searchInputText}
        onChangeText={setSearchInputText}
        style={styles.input}
      />
      {loading ? (
        <Text>Loading</Text>
      ) : (
        data &&
        data.results.map(item => <MovieListItem key={item.id} data={item} />)
      )}
    </ScrollView>
  );
};

export default Search;
