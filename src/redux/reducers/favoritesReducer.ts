import { AnyAction } from 'redux';
import { NewsType } from '../../types';
import { REMOVE_FAVORITE, UPDATE_FAVORITE } from '../actions';

const INITIAL_STATE: NewsType[] = [];

const favoritesReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_FAVORITE:
      return [...action.payload];
    case REMOVE_FAVORITE:
      return [...action.payload];
    default:
      return state;
  }
};

export default favoritesReducer;
