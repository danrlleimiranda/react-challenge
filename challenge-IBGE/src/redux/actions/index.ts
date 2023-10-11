import fetchAPI from "../../services/fetchAPI";
import {  Dispatch } from 'redux';
export const FETCH_STARTED = "FETCH_STARTED"
export const FETCH_SUCCESS = "FETCH_SUCCESS"
export const FETCH_ERROR = "FETCH_ERROR"


const fetchStarted = {
    type: FETCH_STARTED
};

const fetchSuccess = (payload: any) => ({
    type: FETCH_SUCCESS,
    payload,
})

const fetchError = (error: any) => ({
    type: FETCH_ERROR,
    error
})


export const fetchData = () => {
    return async (dispatch: Dispatch) => {
      try {
        dispatch(fetchStarted);
        const data = await fetchAPI();
       dispatch(fetchSuccess(data))
      } catch (error: any) {
        dispatch(fetchError(error.message));
      }
    };
  };