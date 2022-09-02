import { AppDispatch } from '../Redux/store';
import { useDispatch } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
