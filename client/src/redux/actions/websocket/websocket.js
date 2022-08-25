import * as ACTIONS_TYPES from '../../action-types';
import * as MARK_ACTIONS from '../mark/mark';

export const RECORD_WEBSOCKET = (websocket) => ({
  type: ACTIONS_TYPES.RECORD_WEBSOCKET,
  payload: websocket,
});

export const WS_ADD_MARK = (url, mark) =>
  JSON.stringify({
    type: ACTIONS_TYPES.WS_ADD_MARK,
    payload: { url, mark },
  });

export const WS_ADD_MESSAGE_MARK = (url, id, message) =>
  JSON.stringify({
    type: ACTIONS_TYPES.WS_ADD_MESSAGE_MARK,
    payload: { url, id, message },
  });

export const WS_CHANGE_COORDS_MARK = (url, id, position) =>
  JSON.stringify({
    type: ACTIONS_TYPES.WS_CHANGE_COORDS_MARK,
    payload: { url, id, position },
  });

export const WS_CHANGE_VISIBLE_MARK = (url, id, visible) =>
  JSON.stringify({
    type: ACTIONS_TYPES.WS_CHANGE_VISIBLE_MARK,
    payload: { url, id, visible },
  });

export const WS_DELETE_MARK = (url, id) =>
  JSON.stringify({
    type: ACTIONS_TYPES.WS_DELETE_MARK,
    payload: { url, id },
  });

export const WS_DELETE_MESSAGE_MARK = (url, idMark, idMessage) =>
  JSON.stringify({
    type: ACTIONS_TYPES.WS_DELETE_MESSAGE_MARK,
    payload: { url, idMark, idMessage },
  });

export const WS_DISPATCH = (data) => async (dispatch, getState) => {
  if (data.payload.url === getState().url) {
    switch (data.type) {
      case ACTIONS_TYPES.WS_ADD_MARK:
        dispatch(MARK_ACTIONS.ADD_MARK(data.payload.mark));
        break;

      case ACTIONS_TYPES.WS_ADD_MESSAGE_MARK:
        dispatch(
          MARK_ACTIONS.ADD_MESSAGE_MARK(data.payload.id, data.payload.message)
        );
        break;

      case ACTIONS_TYPES.WS_CHANGE_COORDS_MARK:
        dispatch(
          MARK_ACTIONS.CHANGE_COORDS_MARK(
            data.payload.id,
            data.payload.position
          )
        );
        break;

      case ACTIONS_TYPES.WS_CHANGE_VISIBLE_MARK:
        dispatch(MARK_ACTIONS.CHANGE_VISIBLE_MARK(data.payload.id));
        break;

      case ACTIONS_TYPES.WS_DELETE_MARK:
        dispatch(MARK_ACTIONS.DELETE_MARK(data.payload.id));
        break;

      case ACTIONS_TYPES.WS_DELETE_MESSAGE_MARK:
        dispatch(
          MARK_ACTIONS.DELETE_MESSAGE_MARK(
            data.payload.idMark,
            data.payload.idMessage
          )
        );
        break;

      default:
    }
  }
};
