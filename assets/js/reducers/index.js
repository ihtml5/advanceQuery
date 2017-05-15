import addLine from './addLine';
import removeLine from './removeLine';
import switchTab from './switchTab';
import { combineReducers } from 'redux';
export default combineReducers({
  addLine,
  removeLine,
  switchTab
});
