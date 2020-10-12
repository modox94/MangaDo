import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Modal from '../Modal';
import * as MARK_ACTIONS from '../../../redux/actions/mark/mark';
import * as LAYERS_ACTIONS from '../../../redux/actions/layers/layers';
import * as WS_ACTIONS from '../../../redux/actions/websocket/websocket';

import styles from './style.module.css';
import iconEye from '../../../icons/eye.png';
import iconEyeClose from '../../../icons/eyeclose.png';
import SidePanelsAccordions from '../SidePanelsAccordions';

const SidePanel = () => {
  const dispatch = useDispatch();
  const [translateMarkTitle, setTranslateMarkTitle] = useState('');
  const [decorteMarkTitle, setDecorMarkTitle] = useState('');
  const [editMarkTitle, setEditMarkTitle] = useState('');
  const markArr = useSelector((state) => state.marks);
  const layers = useSelector((state) => state.layers);
  const translateMarkArr = markArr.filter((el) => el.type === 'translate');
  const decorMarkArr = markArr.filter((el) => el.type === 'decor');
  const editMarkArr = markArr.filter((el) => el.type === 'edit');

  const [modalActive, setModalActive] = useState();
  const [curentMessage, setCurentMessage] = useState('');
  const [curentOpenId, setCurentOpenId] = useState('');

  const ws = useSelector((state) => state.websocket);
  const user = useSelector((state) => state.user);
  const path = useSelector((state) => state.url);

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
      id: uuidv4(),
      type: markType,
      position: {
        x: 0,
        y: 0,
      },
      visible: true,
      messages: [
        {
          user: user.name,
          data: Date.now(),
          value: markTitle,
        },
      ],
      creator: user.name,
    };

    if (markType === 'translate') {
      setTranslateMarkTitle('');
    } else if (markType === 'edit') {
      setEditMarkTitle('');
    } else if (markType === 'decor') {
      setDecorMarkTitle('');
    }

    dispatch(MARK_ACTIONS.ADD_MARK(newMark));

    if (ws) {
      ws.send(WS_ACTIONS.WS_ADD_MARK(path, newMark));
    }
  };

  const handlerCurentMessage = (e) => {
    setCurentMessage(e.target.value);
  };

  const handlerAddMessage = () => {
    let newMessage = {
      user: user.name,
      data: Date.now(),
      value: curentMessage,
    };
    setCurentMessage('');
    dispatch(MARK_ACTIONS.ADD_MESSAGE_MARK(curentOpenId, newMessage));

    if (ws) {
      ws.send(WS_ACTIONS.WS_ADD_MESSAGE_MARK(path, curentOpenId, newMessage));
    }
  };

  const handlerDelete = (e) => {
    dispatch(MARK_ACTIONS.DELETE_MARK(e.target.id));

    if (ws) {
      ws.send(WS_ACTIONS.WS_DELETE_MARK(path, e.target.id));
    }
  };

  const handlerVisible = (e) => {
    dispatch(MARK_ACTIONS.CHANGE_VISIBLE_MARK(e.target.id));

    if (ws) {
      let mark = markArr.find(function (mark) {
        if (mark.id === e.target.id) return true;
      });

      console.log('visible', mark.visible);

      ws.send(
        WS_ACTIONS.WS_CHANGE_VISIBLE_MARK(path, e.target.id, !mark.visible)
      );
    }
  };

  const handlerVisibleLayer = (e) => {
    dispatch(LAYERS_ACTIONS.CHANGE_VISIBLE_LAYER(e.target.id));
  };

  console.log('markArr', markArr);
  console.log('translateMarkArr', translateMarkArr);

  return (
    <div className={styles.sideContainer}>
      <SidePanelsAccordions
        color='#dc3545'
        title='ПЕРЕВОД'
        inputTitle={handlerTitleTranslate}
        inputTitleValue={translateMarkTitle}
        type={'translate'}
        handlerAddMark={handlerAddMark}
        markArr={translateMarkArr}
        handlerVisible={handlerVisible}
        setModalActive={setModalActive}
        setCurentOpenId={setCurentOpenId}
        handlerDelete={handlerDelete}
      />

      <SidePanelsAccordions
        color='#007bff'
        title='ОФОРМЛЕНИЕ'
        inputTitle={handlerTitleDecor}
        inputTitleValue={decorteMarkTitle}
        type={'decor'}
        handlerAddMark={handlerAddMark}
        markArr={decorMarkArr}
        handlerVisible={handlerVisible}
        setModalActive={setModalActive}
        setCurentOpenId={setCurentOpenId}
        handlerDelete={handlerDelete}
      />

      <SidePanelsAccordions
        color='#28a745'
        title='РЕДАКТУРА'
        inputTitle={handlerTitleEdit}
        inputTitleValue={editMarkTitle}
        type={'edit'}
        handlerAddMark={handlerAddMark}
        markArr={editMarkArr}
        handlerVisible={handlerVisible}
        setModalActive={setModalActive}
        setCurentOpenId={setCurentOpenId}
        handlerDelete={handlerDelete}
      />

      <details className={styles.accordion}>
        <summary style={{ color: '#000' }}>СЛОИ</summary>

        {layers.map((layer, index) => {
          return (
            <div key={layer[0]} className={styles.task}>
              <button>
                {layer[1] ? (
                  <img
                    onClick={handlerVisibleLayer}
                    id={layer[0]}
                    style={{ width: '14px', verticalAlign: 'middle' }}
                    src={iconEye}
                  />
                ) : (
                  <img
                    onClick={handlerVisibleLayer}
                    id={layer[0]}
                    style={{ width: '14px', verticalAlign: 'middle' }}
                    src={iconEyeClose}
                  />
                )}
              </button>
              <p>{`Layer ${index}`}</p>
            </div>
          );
        })}
      </details>

      <Modal active={modalActive} setActive={setModalActive}>
        {markArr
          .find((el) => el.id === curentOpenId)
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
