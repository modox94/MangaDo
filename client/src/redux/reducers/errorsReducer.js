import { RECORD_ERROR, CLEAR_ERROR } from '../action-types';

const errorsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECORD_ERROR: {
      const { key, message } = action?.payload || {};
      if (key && message) {
        const newState = { ...state, [key]: message };
        return newState;
      }
      return state;
    }

    case CLEAR_ERROR: {
      const { key } = action?.payload || {};
      if (key && state[key]) {
        const newState = { ...state };
        delete newState[key];
        return newState;
      }
      return state;
    }

    default:
      return state;
  }
};

export default errorsReducer;
