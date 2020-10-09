import { combineReducers } from 'redux';
import markReducer from './markReducer/markReducer';
import websocketReducer from './websocketReducer/websocketReducer';

const rootReducer = combineReducers({
  mark: markReducer,
  websocket: websocketReducer,
});

export default rootReducer;
