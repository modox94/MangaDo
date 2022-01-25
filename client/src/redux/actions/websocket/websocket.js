import * as ACTIONS_TYPES from '../../action-types';
import * as MARK_ACTIONS from '../mark/mark';

const RECORD_WEBSOCKET = (websocket) => ({
    type: ACTIONS_TYPES.RECORD_WEBSOCKET,
    payload: websocket,
  });

const WS_ADD_MARK = (url, mark) => JSON.stringify({
    type: ACTIONS_TYPES.WS_ADD_MARK,
    payload: {
      url,
      mark,
    },
  });

const WS_ADD_MESSAGE_MARK = (url, id, message) => JSON.stringify({
    type: ACTIONS_TYPES.WS_ADD_MESSAGE_MARK,
    payload: {
      url,
      id,
      message,
    },
  });

const WS_CHANGE_COORDS_MARK = (url, id, position) => JSON.stringify({
    type: ACTIONS_TYPES.WS_CHANGE_COORDS_MARK,
    payload: {
      url,
      id,
      position,
    },
  });

const WS_CHANGE_VISIBLE_MARK = (url, id, visible) => JSON.stringify({
    type: ACTIONS_TYPES.WS_CHANGE_VISIBLE_MARK,
    payload: {
      url,
      id,
      visible,
    },
  });

const WS_DELETE_MARK = (url, id) => JSON.stringify({
    type: ACTIONS_TYPES.WS_DELETE_MARK,
    payload: {
      url,
      id,
    },
  });

const WS_DELETE_MESSAGE_MARK = (url, idMark, idMessage) => JSON.stringify({
    type: ACTIONS_TYPES.WS_DELETE_MESSAGE_MARK,
    payload: {
      url,
      idMark,
      idMessage,
    },
  });

const WS_DISPATCH = (data) => async (dispatch, state) => {
  if (data.payload.url === state().url) {
    switch (data.type) {
      case ACTIONS_TYPES.WS_ADD_MARK:
        return dispatch(MARK_ACTIONS.ADD_MARK(data.payload.mark));

      case ACTIONS_TYPES.WS_ADD_MESSAGE_MARK:
        return dispatch(
          MARK_ACTIONS.ADD_MESSAGE_MARK(data.payload.id, data.payload.message)
        );

      case ACTIONS_TYPES.WS_CHANGE_COORDS_MARK:
        return dispatch(
          MARK_ACTIONS.CHANGE_COORDS_MARK(
            data.payload.id,
            data.payload.position
          )
        );

      case ACTIONS_TYPES.WS_CHANGE_VISIBLE_MARK:
        return dispatch(MARK_ACTIONS.CHANGE_VISIBLE_MARK(data.payload.id));

      case ACTIONS_TYPES.WS_DELETE_MARK:
        return dispatch(MARK_ACTIONS.DELETE_MARK(data.payload.id));

      case ACTIONS_TYPES.WS_DELETE_MESSAGE_MARK:
        return dispatch(
          MARK_ACTIONS.DELETE_MESSAGE_MARK(
            data.payload.idMark,
            data.payload.idMessage
          )
        );

      default:
        
    }
  }
};

export {
  RECORD_WEBSOCKET,
  WS_ADD_MARK,
  WS_ADD_MESSAGE_MARK,
  WS_CHANGE_COORDS_MARK,
  WS_CHANGE_VISIBLE_MARK,
  WS_DELETE_MARK,
  WS_DELETE_MESSAGE_MARK,
  WS_DISPATCH,
};
