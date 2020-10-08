import React, { useEffect, useState } from 'react';
import m116o from '../../images/116.jpg';
import m116t from '../../images/116.png';
import k003o from '../../images/003.jpg';
import k003t from '../../images/003.png';
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
  const [img1, setImg1] = useState(false);
  const [img2, setImg2] = useState(false);
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
        let response = await fetch(new URL(path, 'http://localhost:3005/psd/'));
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
            src={'http://localhost:3005/' + image}
            style={{ position: 'absolute' }}
            alt='pic'
          ></img>
        );
      })}

      {translateMarkArr.map((mark) => {
        return (
          <Draggable
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
      {/* <div className='form-check'>
        <input
          onChange={(event) => setImg1(!event.target.checked)}
          className='form-check-input'
          type='checkbox'
          defaultChecked
        />
        <label className='form-check-label'>Image 1</label>
      </div>
      <div className='form-check'>
        <input
          onChange={(event) => setImg2(!event.target.checked)}
          className='form-check-input'
          type='checkbox'
          defaultChecked
        />
        <label className='form-check-label'>Image 2</label>
      </div> */}
    </div>
  );
};

export default ImagesContainer;
