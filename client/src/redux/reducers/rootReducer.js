import { combineReducers } from 'redux';
import layersReducer from './layersReducer/layersReducer';
import marksReducer from './marksReducer/marksReducer';
import urlReducer from './urlReducer/urlReducer';
import userReducer from './userReducer/userReducer';
import websocketReducer from './websocketReducer/websocketReducer';

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
