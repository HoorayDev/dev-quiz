import { useDispatch } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store/index';

export const useAppDispatch: () => AppDispatch = useDispatch;
