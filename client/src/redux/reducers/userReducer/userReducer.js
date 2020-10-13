import * as ACTIONS_TYPES from '../../action-types';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTIONS_TYPES.USER_LOGIN:
      return action.payload;

    case ACTIONS_TYPES.USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export default userReducer;
