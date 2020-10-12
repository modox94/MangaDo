import * as ACTIONS_TYPES from '../../action-types';
import * as MARK_ACTIONS from '../mark/mark';

const RECORD_LAYERS = (layers) => {
  return {
    type: ACTIONS_TYPES.RECORD_LAYERS,
    payload: layers,
  };
};

const CHANGE_VISIBLE_LAYER = (layer) => {
  return {
    type: ACTIONS_TYPES.CHANGE_VISIBLE_LAYER,
    payload: layer,
  };
};

const CLEAR_LAYERS = () => {
  return {
    type: ACTIONS_TYPES.CLEAR_LAYERS,
  };
};

const DOWNLOAD_LAYERS = (path) => async (dispatch) => {
  let response = await fetch(
    new URL('psd/' + path, process.env.REACT_APP_SERVER_PATH)
  );
  let data = await response.json();

  dispatch(RECORD_LAYERS(data.layers));

  dispatch(MARK_ACTIONS.RECORD_MARKS(data.psdObj.marks));
};

export { RECORD_LAYERS, CHANGE_VISIBLE_LAYER, CLEAR_LAYERS, DOWNLOAD_LAYERS };
