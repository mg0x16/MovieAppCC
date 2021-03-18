import axios from 'axios';

const API_ENDPOINT = 'https://api.themoviedb.org/3';
const Api = axios.create({
  baseURL: API_ENDPOINT,
});

const requestHandler = config => {
  const accessToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTUyZWIyMDY0ZWZhMTUxMzk1OGMxNjU5MjczMzdiNSIsInN1YiI6IjYwNTBmNzkzNDFhNTYxMDAzZGJlMDY5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V114_6y_dGOaDzsMNxHXeRJSnL3GpAVIDtURgeUuSio';

  return {
    ...config,
    headers: {
      ...config.headers,
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: config.headers.Authorization || `Bearer ${accessToken}`,
    },
  };
};

const requestErrorHandler = error => {
  return Promise.reject(error);
};

Api.interceptors.request.use(requestHandler, requestErrorHandler);

export {API_ENDPOINT, Api};
