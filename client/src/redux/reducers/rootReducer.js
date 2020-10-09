import { combineReducers } from 'redux';
import marksReducer from './marksReducer/marksReducer';
import websocketReducer from './websocketReducer/websocketReducer';
import userReducer from './userReducer/userReducer';
import urlReducer from './urlReducer/urlReducer';
import layersReducer from './layersReducer/layersReducer';

const rootReducer = combineReducers({
  user: userReducer,
  url: urlReducer,
  marks: marksReducer,
  websocket: websocketReducer,
  layers: layersReducer,
});

export default rootReducer;

// store = {
//   user: { name, password, accessToken, refreshToken },
//   url,
//   marks: [
//     { id, type, position, visible, messages: [{ username, date, value }] },
//   ],
//   layers: [
//     [url, visible],
//     [
//       'http://localhost:3005/static/layers/Kuneru%20Maruta/004.psd/004-2.png',
//       true,
//     ],
//   ],
// };
