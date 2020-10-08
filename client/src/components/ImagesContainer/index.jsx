import React, { useState } from 'react';
import m116o from '../../images/116.jpg';
import m116t from '../../images/116.png';
import k003o from '../../images/003.jpg';
import k003t from '../../images/003.png';
import { useSelector, useDispatch } from 'react-redux';
import styles from './style.module.css';
import Draggable from 'react-draggable';
import * as MARK_ACTIONS from '../../redux/actions/mark/mark';
const ImagesContainer = () => {
  const markArr = useSelector((state) => state.mark);
  const translateMarkArr = markArr.filter((el) => el.type === 'translate');
  const decorMarkArr = markArr.filter((el) => el.type === 'decor');
  const editMarkArr = markArr.filter((el) => el.type === 'edit');
  const [img1, setImg1] = useState(false);
  const [img2, setImg2] = useState(false);
  const dispatch = useDispatch();
  const onControlledDragStop = (e, position, id) => {
    const { x, y } = position;
    dispatch(MARK_ACTIONS.CHANGE_COORDS_MARK(id, { x, y }));
  };
  return (
    <div className={styles.container}>
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

      <div style={{ position: 'relative' }}>
        <img
          src={m116o}
          // style={{ position: 'absolute' }}
          hidden={img1}
          alt='pic'
        ></img>
        {/* <img
          src={m116t}
          style={{ position: 'absolute' }}
          hidden={img2}
          alt='pic'
        ></img>
        <img
          src={process.env.PUBLIC_URL + '/imges/113-5.png'}
          style={{ position: 'absolute' }}
          alt='pic'
        ></img> */}
      </div>
    </div>
  );
};
export default ImagesContainer;
