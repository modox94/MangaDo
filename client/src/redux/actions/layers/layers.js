import * as ACTIONS_TYPES from '../../action-types';
import * as MARK_ACTIONS from '../mark/mark';

export const RECORD_LAYERS = (layers) => ({
  type: ACTIONS_TYPES.RECORD_LAYERS,
  payload: layers,
});

export const RECORD_COMPLETE = (complete) => ({
  type: ACTIONS_TYPES.RECORD_COMPLETE,
  payload: complete,
});

export const CHANGE_VISIBLE_LAYER = (layer) => ({
  type: ACTIONS_TYPES.CHANGE_VISIBLE_LAYER,
  payload: layer,
});

export const CHANGE_VISIBLE_ALL_LAYERS = (visible) => ({
  type: ACTIONS_TYPES.CHANGE_VISIBLE_ALL_LAYERS,
  payload: visible,
});

export const CLEAR_LAYERS = () => ({
  type: ACTIONS_TYPES.CLEAR_LAYERS,
});

export const DOWNLOAD_LAYERS = (path) => async (dispatch) => {
  const response = await fetch(
    new URL(`psd/${path}/layers`, process.env.REACT_APP_SERVER_PATH)
  );
  const data = await response.json();

  dispatch(RECORD_LAYERS(data.layers));

  dispatch(MARK_ACTIONS.RECORD_MARKS(data.psdObj.marks));
};

export const DOWNLOAD_COMPLETE = (path) => async (dispatch) => {
  const response = await fetch(
    new URL(`psd/${path}`, process.env.REACT_APP_SERVER_PATH)
  );
  const data = await response.json();

  dispatch(RECORD_COMPLETE(data.complete));

  dispatch(MARK_ACTIONS.RECORD_MARKS(data.psdObj.marks));
};
