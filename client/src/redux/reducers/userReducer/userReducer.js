import * as ACTIONS_TYPES from '../../action-types';

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'value':
      return [];

    default:
      return state;
  }
};

export default userReducer;
