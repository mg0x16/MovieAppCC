import {Navigation} from 'react-native-navigation';

import HomeScreen from './src/pages/Home';

Navigation.registerComponent('com.movieappcc.HomeScreen', () => HomeScreen);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'com.movieappcc.HomeScreen',
            },
          },
        ],
      },
    },
  });
});
