import axios from 'axios';
import { userAnswerValue } from '~/store/slices/userAnswerListSlice';

const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
const endPoint = `${protocol}://api.devquiz.co.kr/api`;
const user = '/user'
const quizSetList = '/quiz-set'

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
  const configOption = { withCredentials: true };
  const url = `${endPoint}${quizSetList}/${quizSetId}/quiz`;

  return await axios.get(url, configOption).then(res => res.data);
}

// 퀴즈 문제 단일 조회 : 디테일 페이지 사용
export const getQuizQuestionAPI = async (quizSetId: string, quizId: string) => {
  const configOption = { withCredentials: true };
  const url = `${endPoint}${quizSetList}/${quizSetId}/quiz/${quizId}`;

  return await axios.get(url, configOption).then(res => res.data);
}

// 퀴즈 옵션 전체(한 문제의 옵션 전체) 조회 : 디테일 페이지 사용
export const getQuizOptionListAPI = async (quizSetId: string, quizId: string) => {
  const configOption = { withCredentials: true };
  const url = `${endPoint}${quizSetList}/${quizSetId}/quiz/${quizId}/quiz-option`;

  return await axios.get(url, configOption).then(res => res.data);
}

// 사용자 정답 제출 : 디테일 페이지 마지막 문제 풀이 시 사용
export const setUserAnswerAPI = async (quizSetId: string, userVoteList: userAnswerValue[]) => {
  const configOption = { withCredentials: true };
  const url = `${endPoint}${quizSetList}/${quizSetId}/response`

  return await axios.post(url, { userVoteList }, configOption).then(res => res.data);
}

// 퀴즈 업데이트 구독 : 결과 페이지에서 요청
export const subscribeAPI = async (email:string) => {
  const configOption = { withCredentials: true };
  const url = `${endPoint}/subscribe`;
  return await axios.post(url, { email },configOption)
};