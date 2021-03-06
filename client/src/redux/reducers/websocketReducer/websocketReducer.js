import * as ACTIONS_TYPES from '../../action-types';

const websocketReducer = (state = '', action) => {
  switch (action.type) {
    case ACTIONS_TYPES.RECORD_WEBSOCKET:
      return action.payload;

    default:
      return state;
  }
};

export default websocketReducer;
