import axios from 'axios';

const endPoint = 'http://api.devquiz.co.kr';
const user = '/api/user'

export const getQuizSetAPI = async () => {
  return await axios.get('/data/quizSetMockData.json')
    .then(res => res.data);
}

export const setUserIdAPI = async (name: string) => {
  return await axios.post(`${endPoint}${user}`, {
    name,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })
};
