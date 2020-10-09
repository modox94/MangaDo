import * as ACTIONS_TYPES from '../../action-types';

const RECORD_PSD_URL = (url) => {
  return {
    type: ACTIONS_TYPES.RECORD_PSD_URL,
    payload: url,
  };
};

export { RECORD_PSD_URL };
