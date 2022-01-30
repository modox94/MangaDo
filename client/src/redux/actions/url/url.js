import * as ACTIONS_TYPES from '../../action-types';

export const RECORD_PSD_URL = (url) => ({
  type: ACTIONS_TYPES.RECORD_PSD_URL,
  payload: url,
});
