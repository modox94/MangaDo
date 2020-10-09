import * as ACTIONS_TYPES from '../../action-types';

const RECORD_WEBSOCKET = (websocket) => {
  return {
    type: ACTIONS_TYPES.RECORD_WEBSOCKET,
    payload: websocket,
  };
};

export { RECORD_WEBSOCKET };
