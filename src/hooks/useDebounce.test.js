const {renderHook, act} = require('@testing-library/react-hooks');

import 'react-native';
import useDebounce from './useDebounce';

const delay = (t, v) => {
  return new Promise(resolve => {
    setTimeout(resolve.bind(null, v), t);
  });
};

describe('Test Debounce functionality', () => {
  it('should return the given text', () => {
    const {result} = renderHook(() => useDebounce('some text', 200));
    expect(result.current).toMatch('some text');
  });

  it("should return the same text if text changed and the specified time hasn't passed", async () => {
    let text = 'some text';

    const {result, rerender} = renderHook(() => useDebounce(text, 200));

    text = 'another text';
    rerender();

    await act(() => delay(100));

    expect(result.current).toMatch('some text');
  });

  it('should return the updated text if text changed and the specified time hasn passed', async () => {
    let text = 'some text';

    const {result, rerender} = renderHook(() => useDebounce(text, 200));

    text = 'another text';
    rerender();

    await act(() => delay(300));

    expect(result.current).toMatch('another text');
  });
});
