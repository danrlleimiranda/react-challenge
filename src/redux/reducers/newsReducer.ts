import { AnyAction } from 'redux';
import { FETCH_SUCCESS } from '../actions';

const INITIAL_STATE = {};

const newsReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return { ...action.payload };
    default:
      return state;
  }
};

export default newsReducer;
