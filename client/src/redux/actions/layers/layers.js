import * as ACTIONS_TYPES from '../../action-types';

const RECORD_LAYERS = (layers) => {
  return {
    type: ACTIONS_TYPES.RECORD_LAYERS,
    payload: layers,
  };
};

const DOWNLOAD_LAYERS = (path) => async (dispatch) => {
  let response = await fetch(
    new URL('psd/' + path, process.env.REACT_APP_SERVER_PATH)
  );
  let data = await response.json();

  dispatch(RECORD_LAYERS(data.layers));
};

export { RECORD_LAYERS, DOWNLOAD_LAYERS };
