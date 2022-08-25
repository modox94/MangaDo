import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  // DOWNLOAD_LAYERS,
  DOWNLOAD_COMPLETE,
  CLEAR_LAYERS,
} from '../../../redux/actions/layers/layers';
import * as MARK_ACTIONS from '../../../redux/actions/mark/mark';
import * as URL_ACTIONS from '../../../redux/actions/url/url';
import * as WS_ACTIONS from '../../../redux/actions/websocket/websocket';
import { ERROR_KEYS, MARK_TYPES } from '../../../redux/const';
import { noop } from '../../../utils/commonUtils';
import ModalSpinner from '../../ModalSpinner';
import styles from './style.module.css';

const getBackgroundColor = (type) => {
  switch (type) {
    case MARK_TYPES.TRANSLATE:
      return { backgroundColor: 'red' };

    case MARK_TYPES.DECOR:
      return { backgroundColor: 'blue' };

    case MARK_TYPES.EDIT:
      return { backgroundColor: 'green' };

    default:
      return {};
  }
};

const ImagesContainer = ({ setModalActive, setCurentOpenId }) => {
  const markArr = useSelector((state) => state.marks);

  const errors = useSelector((state) => state.errors);
  const ws = useSelector((state) => state.websocket);
  const layers = useSelector((state) => state.layers);
  const user = useSelector((state) => state.user);

  const { path } = useParams();

  const dispatch = useDispatch();

  const onControlledDragStop = (mark, event, position) => {
    const { id, creator } = mark || {};
    const { role, name } = user || {};

    if (role === 'admin' || (role === 'worker' && name === creator)) {
      const { x, y } = position;
      dispatch(MARK_ACTIONS.CHANGE_COORDS_MARK(id, { x, y }));
      if (ws) {
        ws.send(WS_ACTIONS.WS_CHANGE_COORDS_MARK(path, id, { x, y }));
      }
    }
  };

  useEffect(() => {
    if (path) {
      dispatch(URL_ACTIONS.RECORD_PSD_URL(path));
      // dispatch(DOWNLOAD_LAYERS(path));
      dispatch(DOWNLOAD_COMPLETE(path));
    }

    return () => {
      dispatch(CLEAR_LAYERS());
      dispatch(MARK_ACTIONS.CLEAR_MARKS());
    };
  }, [dispatch, path]);

  if (errors?.[ERROR_KEYS.PSD]) {
    return <span>{errors[ERROR_KEYS.PSD]}</span>;
  }

  return layers.length && ws ? (
    <div className={styles.container}>
      {layers.map((image) => (
        <img
          key={image[0]}
          src={process.env.REACT_APP_SERVER_PATH + image[0]}
          style={image[1] ? {} : { visibility: 'hidden' }}
          className={styles.images}
          alt="pic"
        />
      ))}

      {markArr.map((mark) => (
        <Draggable
          bounds="img"
          key={mark.id}
          onStart={noop}
          onStop={(...args) => onControlledDragStop(mark, ...args)}
          position={mark.position}
        >
          <div
            onDoubleClick={() => {
              setCurentOpenId(mark.id);
              setModalActive(true);
            }}
            className={mark.visible ? styles.mark : styles.disableMark}
            style={getBackgroundColor(mark.type)}
          />
        </Draggable>
      ))}
    </div>
  ) : (
    <ModalSpinner />
  );
};

ImagesContainer.propTypes = {
  setModalActive: PropTypes.func,
  setCurentOpenId: PropTypes.func,
};

export default ImagesContainer;
