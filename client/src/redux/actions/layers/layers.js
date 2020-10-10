import * as ACTIONS_TYPES from '../../action-types';
import * as MARK_ACTIONS from '../mark/mark';

const RECORD_LAYERS = (layers) => {
  return {
    type: ACTIONS_TYPES.RECORD_LAYERS,
    payload: layers,
  };
};

const DOWNLOAD_LAYERS = (path) => async (dispatch) => {
  console.log('DOWNLOAD_LAYERS');

  let response = await fetch(
    new URL('psd/' + path, process.env.REACT_APP_SERVER_PATH)
  );
  let data = await response.json();

  dispatch(RECORD_LAYERS(data.layers));
  // написать новый редусер для точек, который будет заменять их во всем стейте
  for (let mark of data.psdObj.marks) {
    dispatch(MARK_ACTIONS.ADD_MARK(mark));
  }
};

export { RECORD_LAYERS, DOWNLOAD_LAYERS };
