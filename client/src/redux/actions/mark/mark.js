import * as ACTIONS_TYPES from '../../action-types';

const RECORD_MARKS = (marks) => {
  return {
    type: ACTIONS_TYPES.RECORD_MARKS,
    payload: {
      marks,
    },
  };
};

const ADD_MARK = (newMark) => {
  return {
    type: ACTIONS_TYPES.ADD_MARK,
    payload: {
      newMark,
    },
  };
};

const DELETE_MARK = (id) => {
  return {
    type: ACTIONS_TYPES.DELETE_MARK,
    payload: {
      id,
    },
  };
};

const CHANGE_VISIBLE_MARK = (id) => {
  return {
    type: ACTIONS_TYPES.CHANGE_VISIBLE_MARK,
    payload: {
      id,
    },
  };
};

const CHANGE_COORDS_MARK = (id, position) => {
  return {
    type: ACTIONS_TYPES.CHANGE_COORDS_MARK,
    payload: {
      id,
      position,
    },
  };
};

const ADD_MESSAGE_MARK = (id, newMessage) => {
  return {
    type: ACTIONS_TYPES.ADD_MESSAGE_MARK,
    payload: {
      id,
      newMessage,
    },
  };
};

const DELETE_MESSAGE_MARK = (idMark, idMessage) => {
  return {
    type: ACTIONS_TYPES.DELETE_MESSAGE_MARK,
    payload: {
      idMark,
      idMessage,
    },
  };
};

export {
  RECORD_MARKS,
  ADD_MARK,
  DELETE_MARK,
  CHANGE_VISIBLE_MARK,
  CHANGE_COORDS_MARK,
  ADD_MESSAGE_MARK,
  DELETE_MESSAGE_MARK,
};
