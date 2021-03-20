import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import {Provider} from 'react-redux';

import MovieListItem from './MovieListItem';

describe('Test movie card item', () => {
  it('should render important data about the movie', () => {
    const {store} = require('../store/configureStore');

    const n = render(
      <Provider store={store}>
        <MovieListItem
          data={{
            poster_path: '/',
            id: 1,
            title: 'movie_name',
            overview: 'this is the overview',
            release_date: '12',
            vote_average: '5',
            original_language: 'en',
          }}
        />
      </Provider>,
    );

    expect(n.queryByText('movie_name')).toBeTruthy();
    expect(n.queryByText('this is the overview')).toBeTruthy();
    expect(n.queryByText('Release Date: 12')).toBeTruthy();
    expect(n.queryByText('5')).toBeTruthy();
    expect(n.queryByText('en')).toBeTruthy();
    expect(n.queryByText('does not exists')).toBeFalsy();
  });

  it('should add and remove item to favourites when click on fav button', () => {
    const {store} = require('../store/configureStore');

    const n = render(
      <Provider store={store}>
        <MovieListItem data={{poster_path: '/', id: 1}} />
      </Provider>,
    );

    expect(store.getState().favourites.value).toEqual([]);

    const favButton = n.getByTestId('favButton');

    fireEvent.press(favButton);
    expect(store.getState().favourites.value).toEqual([
      {poster_path: '/', id: 1},
    ]);

    fireEvent.press(favButton);
    expect(store.getState().favourites.value).toEqual([]);
  });
});
