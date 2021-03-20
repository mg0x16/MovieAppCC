const {renderHook} = require('@testing-library/react-hooks');

import 'react-native';
import {useGet} from './useRestful';

const delay = (t, v) => {
  return new Promise(resolve => {
    setTimeout(resolve.bind(null, v), t);
  });
};

describe('Test restful hook state variables', () => {
  it('should return the correct initial hook control values', () => {
    const {result: r1} = renderHook(() => useGet({url: ''}));

    expect(r1.current.loading).toBeFalsy();
    expect(r1.current.error).toBeNull();
    expect(r1.current.data).toBeNull();

    const {result: r2} = renderHook(() =>
      useGet({
        url: '',
        initialLoading: true,
        initialData: [1, 2],
      }),
    );

    expect(r2.current.loading).toBeTruthy();
    expect(r2.current.error).toBeNull();
    expect(r2.current.data).toEqual([1, 2]);
  });

  it('should handle request correctly and return data', async () => {
    const fakeHandler = async () => {
      await delay(100);
      return [{id: 123}];
    };
    const {result} = renderHook(() =>
      useGet({asyncRequestHandler: fakeHandler}),
    );

    await result.current.run();

    expect(result.current.data).toEqual([{id: 123}]);
    expect(result.current.error).toBeNull();
  });

  it('should throw error at the request', async () => {
    const fakeHandler = async () => {
      await delay(100);
      throw new Error('error');
    };

    const {result} = renderHook(() =>
      useGet({asyncRequestHandler: fakeHandler}),
    );

    await result.current.run();

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('error');
  });
});
