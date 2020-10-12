import * as ACTIONS_TYPES from '../../action-types';

const translateReducer = (state = [], action) => {
  switch (action.type) {
    case ACTIONS_TYPES.RECORD_MARKS:
      return action.payload.marks;

    case ACTIONS_TYPES.ADD_MARK:
      return [...state, action.payload.newMark];

    case ACTIONS_TYPES.DELETE_MARK:
      return state.filter((el) => el.id !== action.payload.id);

    case ACTIONS_TYPES.CHANGE_VISIBLE_MARK:
      return state.map((el) => {
        if (el.id === action.payload.id) return { ...el, visible: !el.visible };
        return el;
      });

    case ACTIONS_TYPES.CHANGE_COORDS_MARK:
      return state.map((el) => {
        if (el.id === action.payload.id)
          return { ...el, position: action.payload.position };
        return el;
      });

    case ACTIONS_TYPES.ADD_MESSAGE_MARK:
      return state.map((el) => {
        if (el.id === action.payload.id)
          return {
            ...el,
            messages: [...el.messages, action.payload.newMessage],
          };
        return el;
      });

    case ACTIONS_TYPES.DELETE_MESSAGE_MARK:
      return state.map((mark) => {
        if (mark.id === action.payload.idMark) {
          return {
            ...mark,
            messages: mark.messages.filter((message) => {
              return String(message.data) !== action.payload.idMessage;
            }),
          };
        } else {
          return mark;
        }
      });

    default:
      return state;
  }
};

export default translateReducer;
