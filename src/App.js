import {Navigation} from 'react-native-navigation';

import HomeIcon from '../assets/icons/home.png';
import SearchIcon from '../assets/icons/search.png';
import FavouritesIcon from '../assets/icons/fav.png';

import registerScreens from './screens/registerScreens';

export const runApp = () => {
  registerScreens();

  Navigation.setDefaultOptions({
    statusBar: {
      backgroundColor: '#3F51B5',
    },
    topBar: {
      title: {
        color: 'white',
      },
      backButton: {
        color: 'white',
      },
      background: {
        color: '#3F51B5',
      },
    },
  });

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
                          testID: 'HomeBottomTab',
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
                          testID: 'SearchBottomTab',
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
                          testID: 'FavBottomTab',
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
};
