import axios from 'axios';

const endPoint = 'http://api.devquiz.co.kr';
const user = '/api/user'
const quizSetList = '/api/quiz-set'

// 유저 로그인 : 메인 페이지 사용
export const setLoginAPI = async (name: string) => {
  const configOption = { withCredentials: true };
  const url = `${endPoint}${user}`

  return await axios.post(url, { name }, configOption);
};

// 퀴즈 Set 목록 조회 : 메인 페이지 사용
export const getQuizSetListAPI = async (page = 1, limit = 10) => {
  const url = `${endPoint}${quizSetList}?page=${page}&limit=${limit}`;

  return await axios.get(url).then(res => res.data);
}

// 퀴즈 Set 단일 조회 : Set 내부 퀴즈 개별 ID 가져오기 위해 사용
export const getQuizSetAPI = async (quizSetId: string) => {
  const url = `${endPoint}${quizSetList}/${quizSetId}`;

  return await axios.get(url).then(res => res.data);
}

// 정답 포함 퀴즈 전체 조회 : 해설 보기 페이지 사용
export const getQuizAnwserListAPI = async (quizSetId: string) => {
  const url = `${endPoint}${quizSetList}/${quizSetId}/quiz`;

  return await axios.get(url).then(res => res.data);
}

// 퀴즈 문제 단일 조회 : 디테일 페이지 사용
export const getQuizQuestionAPI = async (quizSetId: string, quizId: string) => {
  const url = `${endPoint}${quizSetList}/${quizSetId}/quiz/${quizId}`;

  return await axios.get(url).then(res => res.data);
}

// 퀴즈 옵션 전체(한 문제의 옵션 전체) 조회 : 디테일 페이지 사용
export const getQuizOptionListAPI = async (quizSetId: string, quizId: string) => {
  const url = `${endPoint}${quizSetList}/${quizSetId}/quiz/${quizId}/quiz-option`;

  return await axios.get(url).then(res => res.data);
}

// 사용자 정답 제출 : 디테일 페이지 마지막 문제 풀이 시 사용
export const setUserAnswerAPI = async (quizSetId: string, userVoteList: { quizId: string, selectedOption: string }[]) => {
  const url = `${endPoint}${user}/${quizSetId}/response`

  return await axios.post(url, { userVoteList });
}
