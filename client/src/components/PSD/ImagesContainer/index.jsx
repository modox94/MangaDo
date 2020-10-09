import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Draggable from 'react-draggable';
import * as MARK_ACTIONS from '../../../redux/actions/mark/mark';
import * as LAYERS_ACTIONS from '../../../redux/actions/layers/layers';

import styles from './style.module.css';

const ImagesContainer = () => {
  const markArr = useSelector((state) => state.marks);
  const translateMarkArr = markArr.filter((el) => el.type === 'translate');
  const decorMarkArr = markArr.filter((el) => el.type === 'decor');
  const editMarkArr = markArr.filter((el) => el.type === 'edit');

  const path = useSelector((state) => state.url);
  const layers = useSelector((state) => state.layers);

  const dispatch = useDispatch();

  const onControlledDragStop = (e, position, id) => {
    const { x, y } = position;
    dispatch(MARK_ACTIONS.CHANGE_COORDS_MARK(id, { x, y }));
  };

  useEffect(() => {
    if (path) {
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
              onControlledDragStop(e, position, mark._id);
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
              onControlledDragStop(e, position, mark._id);
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
              onControlledDragStop(e, position, mark._id);
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
