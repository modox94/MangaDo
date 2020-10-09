import * as ACTIONS_TYPES from '../../action-types';

const websocketReducer = (state = '', action) => {
  switch (action.type) {
    case ACTIONS_TYPES.RECORD_WEBSOCKET:
      console.log('action.payload', action.payload);
      console.log('state', state);
      const ws = action.payload;
      return ws;

    default:
      return state;
  }
};

export default websocketReducer;
