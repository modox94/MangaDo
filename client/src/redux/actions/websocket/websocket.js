import * as ACTIONS_TYPES from '../../action-types';

const RECORD_WEBSOCKET = (websocket) => {
  return {
    type: ACTIONS_TYPES.RECORD_WEBSOCKET,
    payload: websocket,
  };
};

const WS_ADD_MARK = (url, mark) => {
  return JSON.stringify({
    type: ACTIONS_TYPES.WS_ADD_MARK,
    payload: {
      url,
      mark,
    },
  });
};

const WS_ADD_MESSAGE_MARK = () => {};

const WS_CHANGE_COORDS_MARK = (url, id, position) => {
  return JSON.stringify({
    type: ACTIONS_TYPES.WS_CHANGE_COORDS_MARK,
    payload: {
      url,
      id,
      position,
    },
  });
};

const WS_CHANGE_VISIBLE_MARK = () => {};

const WS_DELETE_MARK = () => {};

export {
  RECORD_WEBSOCKET,
  WS_ADD_MARK,
  WS_ADD_MESSAGE_MARK,
  WS_CHANGE_COORDS_MARK,
  WS_CHANGE_VISIBLE_MARK,
  WS_DELETE_MARK,
};
