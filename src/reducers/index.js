import { combineReducers } from 'redux';
import board from './boardReducer';
import stickies from './stickieReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  board,
  stickies,
  routing: routerReducer
});

export default rootReducer;
