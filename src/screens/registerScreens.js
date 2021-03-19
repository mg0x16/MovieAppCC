import React from 'react';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import HomeScreen from './Home';
import FavouritesScreen from './Favourites';
import SearchScreen from './Search';
import MovieDetailsScreen from './MovieDetails';

import {ConfigsProvider} from '../context/Configs';
import {store, persistor} from '../store/configureStore';

const registerScreens = () => {
  const createScreen = Screen => () => props => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigsProvider
          value={{imageUrlBase: 'https://image.tmdb.org/t/p/original'}}>
          <Screen {...props} />
        </ConfigsProvider>
      </PersistGate>
    </Provider>
  );

  Navigation.registerComponent('HomeScreen', createScreen(HomeScreen));
  Navigation.registerComponent('SearchScreen', createScreen(SearchScreen));
  Navigation.registerComponent(
    'FavouritesScreen',
    createScreen(FavouritesScreen),
  );
  Navigation.registerComponent(
    'MovieDetailsScreen',
    createScreen(MovieDetailsScreen),
  );
};

export default registerScreens;
