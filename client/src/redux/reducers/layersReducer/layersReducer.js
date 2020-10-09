import * as ACTIONS_TYPES from '../../action-types';

const layersReducer = (state = [], action) => {
  let newState;

  switch (action.type) {
    case ACTIONS_TYPES.RECORD_LAYERS:
      return action.payload;

    case ACTIONS_TYPES.CHANGE_VISIBLE_LAYER:
      newState = state.map((layer) => {
        if (layer[0] === action.payload) {
          return [layer[0], !layer[1]];
        } else {
          return layer;
        }
      });

      return newState;

    default:
      return state;
  }
};

export default layersReducer;
