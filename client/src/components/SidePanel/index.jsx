import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './style.module.css';
import * as MARK_ACTIONS from '../../redux/actions/mark/mark';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../Modal';
import { useParams } from 'react-router-dom';

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

  const ws = useSelector((state) => state.websocket);

  const { path } = useParams();

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
      psd: path,
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

    if (ws) {
      ws.send(JSON.stringify(newMark));
    }
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
      <details className={styles.accordion}>
        <summary style={{ color: '#dc3545' }}>ПЕРЕВОД</summary>
        <textarea
          rows='4'
          onChange={handlerTitleTranslate}
          value={translateMarkTitle}
        ></textarea>
        <button
          className={styles.buttonAdd}
          onClick={() => handlerAddMark('translate', translateMarkTitle)}
        >
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

      <details className={styles.accordion}>
        <summary style={{ color: '#007bff' }}>ОФОРМЛЕНИЕ</summary>
        <textarea
          rows='4'
          onChange={handlerTitleDecor}
          value={decorteMarkTitle}
        ></textarea>
        <button
          className={styles.buttonAdd}
          onClick={() => handlerAddMark('decor', decorteMarkTitle)}
        >
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

      <details className={styles.accordion}>
        <summary style={{ color: '#28a745' }}>РЕДАКТУРА</summary>
        <textarea
          rows='4'
          onChange={handlerTitleEdit}
          value={editMarkTitle}
        ></textarea>
        <button
          className={styles.buttonAdd}
          onClick={() => handlerAddMark('edit', editMarkTitle)}
        >
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
        {markArr
          .find((el) => el._id === curentOpenId)
          ?.messages.map((message) => {
            return (
              <div className={styles.messageModal} key={message.data}>
                <p>
                  <span className={styles.userSpan}>{message.user}</span>
                  <span
                    style={{ color: '#6c757d' }}
                    className={styles.timeSpan}
                  >
                    {new Date(message.data).toLocaleDateString()}
                  </span>
                </p>

                <span className={styles.messageSpan}>{message.value}</span>
              </div>
            );
          })}
        <div className={styles.modalInput}>
          <textarea
            style={{ resize: 'none' }}
            rows='4'
            onChange={handlerCurentMessage}
            value={curentMessage}
          ></textarea>
          <button className={styles.buttonAdd} onClick={handlerAddMessage}>
            {' '}
            Добавить{' '}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SidePanel;
