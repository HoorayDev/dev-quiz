import axios from 'axios';

export const getQuizSetAPI = async () => {
  return await axios.get('/data/quizSetMockData.json')
    .then(res => res.data);
}
