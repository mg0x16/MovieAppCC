import {useState, useCallback} from 'react';

import {Api} from '../utils/api';

const handleAxiosNetworkRequest = async ({restfulType, url, config, data}) => {
  let response;

  try {
    if (restfulType === 'get' || restfulType === 'delete') {
      response = await Api[restfulType](url, {...config, data});
    } else if (restfulType === 'post' || restfulType === 'put') {
      response = await Api[restfulType](url, data, config);
    } else {
      throw new Error('restfulType not supported');
    }
  } catch (e) {
    throw e;
  }

  return response.data;
};

const useRestful = ({
  url: initialURL,
  config: initialConfig,
  initialData = null,
  initialLoading = false,
  restfulType = 'get',
  asyncRequestHandler = handleAxiosNetworkRequest,
}) => {
  const [loading, setLoading] = useState(initialLoading);
  const [responseData, setResponseData] = useState(initialData);
  const [error, setError] = useState(null);

  const run = useCallback(
    async ({data, url: runURL, config: runConfig} = {}) => {
      const url = runURL || initialURL;
      const config = runConfig || initialConfig || {};

      try {
        setLoading(true);
        setError(null);

        const finalData = await asyncRequestHandler({
          data,
          url,
          config,
          restfulType,
        });

        setResponseData(finalData);
        setLoading(false);

        return {data: finalData};
      } catch (exp) {
        setLoading(false);
        setError(exp.message);

        return {data: null, error: exp, status: exp.status};
      }
    },
    [initialURL, initialConfig, restfulType],
  );

  return {run, loading, error, data: responseData};
};

export const useGet = args => useRestful({...args, restfulType: 'get'});
export const usePut = args => useRestful({...args, restfulType: 'put'});
export const usePost = args => useRestful({...args, restfulType: 'post'});
export const useDelete = args => useRestful({...args, restfulType: 'delete'});
