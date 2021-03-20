import React, {useCallback, useMemo} from 'react';

import {TouchableNativeFeedback, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';

import {
  add as addToFavourites,
  remove as removeFromFavourites,
} from '../store/favouritesSlice';

const styles = StyleSheet.create({
  root: {
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const FavouriteButton = ({data}) => {
  const favList = useSelector(state => state.favourites.value);
  const dispatch = useDispatch();

  const isFavourite = useMemo(() => {
    return favList.find(i => i.id === data.id);
  }, [favList, data]);

  const handleRemoveFromFav = useCallback(() => {
    dispatch(removeFromFavourites(data));
  }, [data]);

  const handleAddToFav = useCallback(() => {
    dispatch(addToFavourites(data));
  }, [data]);

  return (
    <TouchableNativeFeedback
      testID="favButton"
      onPress={isFavourite ? handleRemoveFromFav : handleAddToFav}>
      <View style={styles.root}>
        <Icon
          name={`ios-heart${isFavourite ? '' : '-outline'}`}
          size={26}
          color="#3F51B5"
        />
      </View>
    </TouchableNativeFeedback>
  );
};

export default FavouriteButton;
