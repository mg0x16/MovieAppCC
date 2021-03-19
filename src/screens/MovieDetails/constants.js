import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

export const MIN_HEADER_HEIGHT = 64;
export const MAX_HEADER_HEIGHT = height * 0.4;
export const HEADER_DELTA = MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT;
