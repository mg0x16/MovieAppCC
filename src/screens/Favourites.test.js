import React from 'react';
import {render} from '@testing-library/react-native';

import {Provider} from 'react-redux';
import {add, remove} from '../store/favouritesSlice';

import FavouritesScreen from './Favourites';

describe('Test favourites screen', () => {
  it('should render favourite movies items from redux state', async () => {
    const {store} = require('../store/configureStore');

    store.dispatch(add({id: 1, title: 'one'}));
    store.dispatch(add({id: 2, title: 'two'}));

    const n = render(
      <Provider store={store}>
        <FavouritesScreen />
      </Provider>,
    );

    expect(n.queryAllByTestId('favButton').length).toBe(2);

    store.dispatch(add({id: 3, title: 'third'}));
    expect(n.queryAllByTestId('favButton').length).toBe(3);

    store.dispatch(remove({id: 2}));
    expect(n.queryAllByTestId('favButton').length).toBe(2);
  });
});
