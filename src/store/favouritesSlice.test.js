import {configureStore} from '@reduxjs/toolkit';

import favouritesReducer, {add, remove} from './favouritesSlice';

describe('Test favourites reducer and actions', () => {
  it('should return the initial state', () => {
    expect(favouritesReducer(undefined, {})).toEqual({value: []});
  });

  it('should add new item to favourites', () => {
    const store = configureStore({reducer: {favourites: favouritesReducer}});
    store.dispatch(add({name: 'Muhamad', id: 123}));
    store.dispatch(add({name: 'Ali', id: 456}));

    const l = store.getState().favourites.value;

    expect(l.length).toBe(2);
    expect(l[0].id).toBe(123);
    expect(l[1].id).toBe(456);
  });

  it('should remove item by id from favourites', () => {
    const store = configureStore({reducer: {favourites: favouritesReducer}});
    store.dispatch(add({name: 'Muhamad', id: 123}));
    store.dispatch(add({name: 'Ali', id: 456}));

    let l = store.getState().favourites.value;
    expect(l.length).toBe(2);
    expect(l[0].id).toBe(123);

    store.dispatch(remove({id: 123}));
    l = store.getState().favourites.value;

    expect(l.length).toBe(1);
    expect(l[0].id).toBe(456);
  });
});
