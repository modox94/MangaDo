import * as ACTIONS_TYPES from '../../action-types';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTIONS_TYPES.USER_LOGIN:
      return action.payload;

    default:
      return state;
  }
};

export default userReducer;
