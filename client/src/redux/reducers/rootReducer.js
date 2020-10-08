import { combineReducers } from 'redux';
import markReducer from './markReducer/markReducer';

const rootReducer = combineReducers({
  mark: markReducer,
});

export default rootReducer;
