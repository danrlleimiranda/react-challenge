import { combineReducers } from 'redux';
import news from './newsReducer';
// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
const rootReducer = combineReducers({ news });

export default rootReducer;
