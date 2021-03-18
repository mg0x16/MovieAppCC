import React from 'react';
import {Navigation} from 'react-native-navigation';

import HomeIcon from './assets/icons/home.png';
import SearchIcon from './assets/icons/search.png';
import FavouritesIcon from './assets/icons/star.png';

import HomeScreen from './src/pages/Home';
import FavouritesScreen from './src/pages/Favourites';
import SearchScreen from './src/pages/Search';
import MovieDetailsScreen from './src/pages/MovieDetails';

import {Api} from './src/utils/api';

import {ConfigsProvider} from './src/context/Configs';

const registerScreens = () => {
  const createScreen = Screen => () => props => (
    <ConfigsProvider
      value={{imageUrlBase: 'https://image.tmdb.org/t/p/original'}}>
      <Screen {...props} />
    </ConfigsProvider>
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

registerScreens();

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'MAIN_STACK',
        children: [
          {
            bottomTabs: {
              id: 'BOTTOM_TABS_LAYOUT',
              children: [
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: 'HomeScreen',
                        },
                      },
                    ],
                    options: {
                      bottomTab: {
                        icon: HomeIcon,
                      },
                    },
                  },
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: 'SearchScreen',
                        },
                      },
                    ],
                    options: {
                      bottomTab: {
                        icon: SearchIcon,
                      },
                    },
                  },
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: 'FavouritesScreen',
                        },
                      },
                    ],
                    options: {
                      bottomTab: {
                        icon: FavouritesIcon,
                      },
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });
});
