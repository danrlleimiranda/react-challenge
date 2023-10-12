import { Dispatch } from 'redux';
import fetchAPI from '../../services/fetchAPI';
import { NewsType } from '../../types';

export const FETCH_STARTED = 'FETCH_STARTED';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';
export const FILTER_FAVORITE = 'FILTER_FAVORITE';

const fetchStarted = {
  type: FETCH_STARTED,
};

const fetchSuccess = (payload: any) => ({
  type: FETCH_SUCCESS,
  payload,
});

const fetchError = (error: any) => ({
  type: FETCH_ERROR,
  error,
});

export const filterFavorite = (payload: NewsType[]) => ({
  type: FILTER_FAVORITE,
  payload,
});

export const fetchData = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(fetchStarted);
      const data = await fetchAPI();
      dispatch(fetchSuccess(data));
    } catch (error: any) {
      dispatch(fetchError(error.message));
    }
  };
};
