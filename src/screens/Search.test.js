import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import {Provider} from 'react-redux';

import SearchScreen from './Search';

describe('Test search screen', () => {
  it('should render movies item in a list when searching', async () => {
    const {store} = require('../store/configureStore');

    const n = render(
      <Provider store={store}>
        <SearchScreen />
      </Provider>,
    );

    const input = n.getByPlaceholderText('Search a movie...');
    expect(input).toBeTruthy();

    let count = n.queryAllByTestId('favButton');
    expect(count.length).toBe(0);

    fireEvent.changeText(input, 'avatar');
    count = await n.findAllByTestId('favButton');
    expect(count.length).toBeGreaterThan(0);
  });
});
