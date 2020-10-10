import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Draggable from 'react-draggable';

import * as URL_ACTIONS from '../../../redux/actions/url/url';
import * as MARK_ACTIONS from '../../../redux/actions/mark/mark';
import * as LAYERS_ACTIONS from '../../../redux/actions/layers/layers';
import * as WS_ACTIONS from '../../../redux/actions/websocket/websocket';

import styles from './style.module.css';

const ImagesContainer = () => {
  const markArr = useSelector((state) => state.marks);
  const translateMarkArr = markArr.filter((el) => el.type === 'translate');
  const decorMarkArr = markArr.filter((el) => el.type === 'decor');
  const editMarkArr = markArr.filter((el) => el.type === 'edit');

  const ws = useSelector((state) => state.websocket);
  const layers = useSelector((state) => state.layers);

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
  }, [path]);

  return (
    <div className={styles.container}>
      {layers.map((image) => {
        return (
          <img
            key={image[0]}
            src={process.env.REACT_APP_SERVER_PATH + image[0]}
            style={image[1] ? {} : { display: 'none' }}
            className={styles.images}
            alt='pic'
          ></img>
        );
      })}

      {translateMarkArr.map((mark) => {
        return (
          <Draggable
            bounds='img'
            key={mark.id}
            onStop={(e, position) => {
              onControlledDragStop(e, position, mark.id);
            }}
            position={mark.position}
          >
            <div
              className={`${
                mark.visible ? styles.markTranslate : styles.disableMark
              }`}
            >
              <div>П</div>
            </div>
          </Draggable>
        );
      })}

      {decorMarkArr.map((mark) => {
        return (
          <Draggable
            bounds='img'
            key={mark.id}
            onStop={(e, position) => {
              onControlledDragStop(e, position, mark.id);
            }}
            position={mark.position}
          >
            <div
              className={`${
                mark.visible ? styles.markDecor : styles.disableMark
              }`}
            >
              <div>О</div>
            </div>
          </Draggable>
        );
      })}

      {editMarkArr.map((mark) => {
        return (
          <Draggable
            bounds='img'
            key={mark.id}
            onStop={(e, position) => {
              onControlledDragStop(e, position, mark.id);
            }}
            position={mark.position}
          >
            <div
              className={`${
                mark.visible ? styles.markEdit : styles.disableMark
              }`}
            >
              <div>Р</div>
            </div>
          </Draggable>
        );
      })}
    </div>
  );
};

export default ImagesContainer;
