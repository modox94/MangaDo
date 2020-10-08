import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './style.module.css';
import * as MARK_ACTIONS from '../../redux/actions/mark/mark';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../Modal';

const SidePanel = () => {
  const dispatch = useDispatch();
  const [translateMarkTitle, setTranslateMarkTitle] = useState('');
  const [decorteMarkTitle, setDecorMarkTitle] = useState('');
  const [editMarkTitle, setEditMarkTitle] = useState('');
  const markArr = useSelector((state) => state.mark);
  const translateMarkArr = markArr.filter((el) => el.type === 'translate');
  const decorMarkArr = markArr.filter((el) => el.type === 'decor');
  const editMarkArr = markArr.filter((el) => el.type === 'edit');

  const [modalActive, setModalActive] = useState();
  const [curentMessage, setCurentMessage] = useState('');
  const [curentOpenId, setCurentOpenId] = useState('');

  const handlerTitleTranslate = (e) => {
    setTranslateMarkTitle(e.target.value);
  };
  const handlerTitleDecor = (e) => {
    setDecorMarkTitle(e.target.value);
  };
  const handlerTitleEdit = (e) => {
    setEditMarkTitle(e.target.value);
  };

  const handlerAddMark = (markType, markTitle) => {
    let newMark = {
      _id: uuidv4(),
      type: markType,
      position: {
        x: 0,
        y: 0,
      },
      visible: true,
      messages: [
        {
          user: 'Редактор',
          data: Date.now(),
          value: markTitle,
        },
      ],
    };
    if (markType === 'translate') {
      setTranslateMarkTitle('');
    } else if (markType === 'edit') {
      setEditMarkTitle('');
    } else if (markType === 'decor') {
      setDecorMarkTitle('');
    }

    dispatch(MARK_ACTIONS.ADD_NEW_MARK(newMark));
  };

  const handlerCurentMessage = (e) => {
    setCurentMessage(e.target.value);
  };

  const handlerAddMessage = () => {
    let newMessage = {
      user: 'Редактор',
      data: Date.now(),
      value: curentMessage,
    };
    setCurentMessage('');
    dispatch(MARK_ACTIONS.ADD_MESSAGE_MARK(curentOpenId, newMessage));
  };

  const handlerDelete = (e) => {
    dispatch(MARK_ACTIONS.DELETE_MARK(e.target.id));
  };

  const handlerVisible = (e) => {
    dispatch(MARK_ACTIONS.CHANGE_VISIBLE_MARK(e.target.id));
  };

  return (
    <div className={styles.sideContainer}>
      <details>
        <summary>ПЕРЕВОД</summary>
        <input
          onChange={handlerTitleTranslate}
          type='text'
          value={translateMarkTitle}
        />
        <button onClick={() => handlerAddMark('translate', translateMarkTitle)}>
          Добавить
        </button>
        {translateMarkArr.map((mark) => {
          return (
            <div key={mark._id} className={styles.task}>
              <button onClick={handlerVisible} id={mark._id}>
                Status
              </button>
              <p
                onClick={() => {
                  setModalActive(true);
                  setCurentOpenId(mark._id);
                }}
              >
                {mark.messages[0].value}
              </p>
              <button onClick={handlerDelete} id={mark._id}>
                Delete
              </button>
            </div>
          );
        })}
      </details>

      <details>
        <summary>ОФОРМЛЕНИЕ</summary>
        <input
          onChange={handlerTitleDecor}
          type='text'
          value={decorteMarkTitle}
        />
        <button onClick={() => handlerAddMark('decor', decorteMarkTitle)}>
          Добавить
        </button>
        {decorMarkArr.map((mark) => {
          return (
            <div key={mark._id} className={styles.task}>
              <button onClick={handlerVisible} id={mark._id}>
                Status
              </button>
              <p
                onClick={() => {
                  setModalActive(true);
                  setCurentOpenId(mark._id);
                }}
              >
                {mark.messages[0].value}
              </p>
              <button onClick={handlerDelete} id={mark._id}>
                Delete
              </button>
            </div>
          );
        })}
      </details>

      <details>
        <summary>РЕДАКТУРА</summary>
        <input onChange={handlerTitleEdit} type='text' value={editMarkTitle} />
        <button onClick={() => handlerAddMark('edit', editMarkTitle)}>
          Добавить
        </button>
        {editMarkArr.map((mark) => {
          return (
            <div key={mark._id} className={styles.task}>
              <button onClick={handlerVisible} id={mark._id}>
                Status
              </button>
              <p
                onClick={() => {
                  setModalActive(true);
                  setCurentOpenId(mark._id);
                }}
              >
                {mark.messages[0].value}
              </p>
              <button onClick={handlerDelete} id={mark._id}>
                Delete
              </button>
            </div>
          );
        })}
      </details>

      <Modal active={modalActive} setActive={setModalActive}>
        <input
          onChange={handlerCurentMessage}
          type='text'
          value={curentMessage}
        />
        <button onClick={handlerAddMessage}> Добавить </button>
        {markArr
          .find((el) => el._id === curentOpenId)
          ?.messages.map((message) => {
            return (
              <div>
                <span>{message.data}</span>
                <span>{message.user}</span>
                <span>{message.value}</span>
              </div>
            );
          })}
      </Modal>
    </div>
  );
};

export default SidePanel;
