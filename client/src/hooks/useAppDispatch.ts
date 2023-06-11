import { useDispatch } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '~/store/store';

export const useAppDispatch: () => AppDispatch = useDispatch;