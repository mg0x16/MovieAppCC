import {Navigation} from 'react-native-navigation';

import HomeIcon from './assets/icons/home.png';
import SearchIcon from './assets/icons/search.png';
import FavouritesIcon from './assets/icons/star.png';

import registerScreens from './src/screens/registerScreens';

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
