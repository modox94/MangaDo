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

const WS_ADD_MESSAGE_MARK = (url, id, message) => {
  return JSON.stringify({
    type: ACTIONS_TYPES.WS_ADD_MESSAGE_MARK,
    payload: {
      url,
      id,
      message,
    },
  });
};

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

const WS_CHANGE_VISIBLE_MARK = (url, id, visible) => {
  return JSON.stringify({
    type: ACTIONS_TYPES.WS_CHANGE_VISIBLE_MARK,
    payload: {
      url,
      id,
      visible,
    },
  });
};

const WS_DELETE_MARK = (url, id) => {
  return JSON.stringify({
    type: ACTIONS_TYPES.WS_DELETE_MARK,
    payload: {
      url,
      id,
    },
  });
};

export {
  RECORD_WEBSOCKET,
  WS_ADD_MARK,
  WS_ADD_MESSAGE_MARK,
  WS_CHANGE_COORDS_MARK,
  WS_CHANGE_VISIBLE_MARK,
  WS_DELETE_MARK,
};
