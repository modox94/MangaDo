import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './style.module.css';
import Draggable from 'react-draggable';
import * as MARK_ACTIONS from '../../redux/actions/mark/mark';
import { useParams } from 'react-router-dom';

const ImagesContainer = () => {
  const markArr = useSelector((state) => state.mark);
  const translateMarkArr = markArr.filter((el) => el.type === 'translate');
  const decorMarkArr = markArr.filter((el) => el.type === 'decor');
  const editMarkArr = markArr.filter((el) => el.type === 'edit');
  const [layers, setLayers] = useState([]);
  const dispatch = useDispatch();

  const { path } = useParams();

  const onControlledDragStop = (e, position, id) => {
    const { x, y } = position;
    dispatch(MARK_ACTIONS.CHANGE_COORDS_MARK(id, { x, y }));
  };

  useEffect(() => {
    if (path) {
      (async () => {
        let response = await fetch(
          new URL('psd/' + path, process.env.REACT_APP_SERVER_PATH)
        );
        let data = await response.json();
        setLayers(data.layers);
      })();
    }
  }, []);

  return (
    <div className={styles.container}>
      {layers.map((image, index) => {
        return (
          <img
          key={image}
            src={process.env.REACT_APP_SERVER_PATH + image}
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
