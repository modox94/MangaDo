import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Draggable from 'react-draggable';
import ModalSpinner from '../../ModalSpinner';
import * as URL_ACTIONS from '../../../redux/actions/url/url';
import * as MARK_ACTIONS from '../../../redux/actions/mark/mark';
import * as LAYERS_ACTIONS from '../../../redux/actions/layers/layers';
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
      dispatch(LAYERS_ACTIONS.DOWNLOAD_LAYERS(path));
    }

    return () => {
      dispatch(LAYERS_ACTIONS.CLEAR_LAYERS());
      dispatch(MARK_ACTIONS.CLEAR_MARKS());
    };
  }, [path]);

  return (
    <>
      {layers.length && ws ? (
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
                  : { onStart: () => false })}
                position={mark.position}
              >
                <div
                  onDoubleClick={() => {
                    setCurentOpenId(mark.id)
                    setModalActive(true) 
                  }}
                  className={`${
                    mark.visible
                      ? mark.type === 'translate'
                        ? styles.markTranslate
                        : mark.type === 'decor'
                        ? styles.markDecor
                        : mark.type === 'edit'
                        ? styles.markEdit
                        : null
                      : styles.disableMark
                  }`}
                >
                  <div>
                    {mark.type === 'translate'
                      ? 'П'
                      : mark.type === 'decor'
                      ? 'О'
                      : mark.type === 'edit'
                      ? 'Р'
                      : null}
                  </div>
                </div>
              </Draggable>
            );
          })}
        </div>
      ) : (
        <ModalSpinner />
      )}
    </>
  );
};

export default ImagesContainer;
