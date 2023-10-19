import { combineReducers } from 'redux';
import news from './newsReducer';
import favorites from './favoritesReducer';

const rootReducer = combineReducers({ news, favorites });

export default rootReducer;
