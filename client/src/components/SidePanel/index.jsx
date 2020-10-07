import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { v4 as uuidv4 } from 'uuid';
import styles from './style.module.css';
import * as MARK_TRANSLATE_ACTIONS from '../../redux/actions/markTranslate/markTranslate';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../Modal';

const SidePanel = () => {
  const dispatch = useDispatch()
  //const [controlledPosition, setControlledPosition] = useState({})
  const [translateMarkTitle, setTranslateMarkTitle] = useState('')
  const translateMarkArr = useSelector((state) => state.translateMark);
  const [modalActive, setModalActive] = useState()

  const onControlledDragStop = (e, position, id) => {
    // onControlledDrag(e, position);
    //console.log('id', e.target.id);
    const { x, y } = position;
    dispatch(MARK_TRANSLATE_ACTIONS.CHANGE_COORDS_MARK_TRANSLATE(id, { x, y }));

    // console.log(controlledPosition); 
  };

  // const onControlledDrag = (e, position) => {
  //   const { x, y } = position;
  //   setControlledPosition({ x, y });
  // };


  const handlerTitle = (e) => {
    setTranslateMarkTitle(e.target.value.trim())
  }
  const handlerAddMarkTranslate = () => {
    let newMark = {
      _id: uuidv4(),
      title: translateMarkTitle,
      position: {
        x: 0,
        y: 0
      },
      visible: true,
      messages: []
    }
    setTranslateMarkTitle('')
    dispatch(MARK_TRANSLATE_ACTIONS.ADD_NEW_MARK_TRANSLATE(newMark));
  }
  const handlerDelete = (e) => {
    dispatch(MARK_TRANSLATE_ACTIONS.DELETE_MARK_TRANSLATE(e.target.id));

  }
  const handlerVisible = (e) => {
    dispatch(MARK_TRANSLATE_ACTIONS.CHANGE_VISIBLE_MARK_TRANSLATE(e.target.id));

  }

  return (



    <div className={styles.sideContainer}>

      <details>
        <summary>ПЕРЕВОД</summary>
        <input onChange={handlerTitle} type="text" value={translateMarkTitle} />
        <button onClick={handlerAddMarkTranslate}> Добавить </button>
        {translateMarkArr.map((mark) => {
          return (
            <div key={mark._id} className={styles.task}>
              <button onClick={handlerVisible} id={mark._id}>Status</button>
              <p onClick={()=> setModalActive(true)} >{mark.title}</p>
              <button onClick={handlerDelete} id={mark._id}>Delete</button>
              <Draggable onStop={(e, position) => { onControlledDragStop(e, position, mark._id) }} position={mark.position}>
                <div className={styles.markTranslate}>
                  <div>П</div>
                </div>
              </Draggable>

            </div>
          )
        })}
      </details>



        <Modal active={modalActive} setActive={setModalActive}>
          <input type="text" name="" id=""/>
        </Modal>


    </div>

  )
}
export default SidePanel



