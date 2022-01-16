import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import ModalSpinner from '../../ModalSpinner';
import * as URL_ACTIONS from '../../../redux/actions/url/url';
import * as MARK_ACTIONS from '../../../redux/actions/mark/mark';
import {
  // DOWNLOAD_LAYERS,
  DOWNLOAD_COMPLETE,
  CLEAR_LAYERS,
} from '../../../redux/actions/layers/layers';
import * as WS_ACTIONS from '../../../redux/actions/websocket/websocket';

import styles from './style.module.css';

const ImagesContainer = ({ setModalActive, setCurentOpenId }) => {
  const markArr = useSelector((state) => state.marks);

  const ws = useSelector((state) => state.websocket);
  const layers = useSelector((state) => state.layers);
  const user = useSelector((state) => state.user);

  const { path } = useParams();

  const dispatch = useDispatch();

  const onControlledDragStop = (event, position, id) => {
    const { x, y } = position;
    dispatch(MARK_ACTIONS.CHANGE_COORDS_MARK(id, { x, y }));
    if (ws) {
      ws.send(WS_ACTIONS.WS_CHANGE_COORDS_MARK(path, id, { x, y }));
    }
  };

  useEffect(() => {
    if (path) {
      dispatch(URL_ACTIONS.RECORD_PSD_URL(path));
      // dispatch(DOWNLOAD_LAYERS(path));
      dispatch(DOWNLOAD_COMPLETE(path));

      // TODO: заменить загрузку слоев на загрузку большого изображения
    }

    return () => {
      dispatch(CLEAR_LAYERS());
      dispatch(MARK_ACTIONS.CLEAR_MARKS());
    };
  }, [path]);

  return layers.length && ws ? (
    <div className={styles.container}>
      {layers.map((image) => {
        return (
          <img
            key={image[0]}
            src={process.env.REACT_APP_SERVER_PATH + image[0]}
            style={image[1] ? {} : { visibility: 'hidden' }}
            className={styles.images}
            alt='pic'
          ></img>
        );
      })}

      {markArr.map((mark) => {
        return (
          <Draggable
            bounds='img'
            key={mark.id}
            {...(user.role === 'admin' ||
            (user.role === 'worker' && user.name === mark.creator)
              ? {
                  onStop: (e, position) => {
                    onControlledDragStop(e, position, mark.id);
                  },
                }
              : { onStart: () => {} })}
            position={mark.position}
          >
            <div
              onDoubleClick={() => {
                setCurentOpenId(mark.id);
                setModalActive(true);
              }}
              className={`${mark.visible ? styles.mark : styles.disableMark}`}
              style={
                mark.type === 'translate'
                  ? { backgroundColor: 'red' }
                  : mark.type === 'decor'
                  ? { backgroundColor: 'blue' }
                  : mark.type === 'edit'
                  ? { backgroundColor: 'green' }
                  : {}
              }
            ></div>
          </Draggable>
        );
      })}
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
