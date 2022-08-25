import * as ACTIONS_TYPES from '../action-types';

export const RECORD_ERROR = ({ key, message } = {}) => ({
  type: ACTIONS_TYPES.RECORD_ERROR,
  payload: { key, message },
});

export const CLEAR_ERROR = ({ key } = {}) => ({
  type: ACTIONS_TYPES.CLEAR_ERROR,
  payload: { key },
});
