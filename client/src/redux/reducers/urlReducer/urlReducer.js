import * as ACTIONS_TYPES from '../../action-types';

const urlReducer = (state = '', action) => {
  switch (action.type) {
    case ACTIONS_TYPES.RECORD_PSD_URL:
      return action.payload;

    default:
      return state;
  }
};

export default urlReducer;
