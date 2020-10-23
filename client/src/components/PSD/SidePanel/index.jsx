import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Linkify from 'react-linkify';
import { v4 as uuidv4 } from 'uuid';
import Modal from '../Modal';
import * as MARK_ACTIONS from '../../../redux/actions/mark/mark';
import * as LAYERS_ACTIONS from '../../../redux/actions/layers/layers';
import * as WS_ACTIONS from '../../../redux/actions/websocket/websocket';
import styles from './style.module.css';
import iconDelete from '../../../icons/delete.png';
import iconEye from '../../../icons/eye.png';
import iconEyeClose from '../../../icons/eyeclose.png';
import SidePanelsAccordions from '../SidePanelsAccordions';

const SidePanel = ({
  setModalActive,
  setCurentOpenId,
  curentOpenId,
  modalActive,
}) => {
  const submitRef = useRef();

  const dispatch = useDispatch();
  const [translateMarkTitle, setTranslateMarkTitle] = useState('');
  const [decorteMarkTitle, setDecorMarkTitle] = useState('');
  const [editMarkTitle, setEditMarkTitle] = useState('');
  const [visibleAllLayer, setVisibleAllLayer] = useState(true);

  const markArr = useSelector((state) => state.marks);
  const layers = useSelector((state) => state.layers);
  const translateMarkArr = markArr.filter((el) => el.type === 'translate');
  const decorMarkArr = markArr.filter((el) => el.type === 'decor');
  const editMarkArr = markArr.filter((el) => el.type === 'edit');

  const [curentMessage, setCurentMessage] = useState('');

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

  const handlerAddMark = (e, markType, markTitle) => {
    e.preventDefault();
    if (!markTitle.trim()) return;
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
          value: markTitle.trim(),
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

  const handlerAddMessage = (e) => {
    e.preventDefault();
    if (!curentMessage.trim()) return;
    let newMessage = {
      user: user.name,
      data: Date.now(),
      value: curentMessage.trim(),
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

  const handlerDeleteMessage = (e) => {
    dispatch(MARK_ACTIONS.DELETE_MESSAGE_MARK(curentOpenId, e.target.id));

    if (ws) {
      ws.send(
        WS_ACTIONS.WS_DELETE_MESSAGE_MARK(path, curentOpenId, e.target.id)
      );
    }
  };

  const handlerVisible = (e) => {
    dispatch(MARK_ACTIONS.CHANGE_VISIBLE_MARK(e.target.id));

    if (ws) {
      let mark = markArr.find(function (mark) {
        if (mark.id === e.target.id) return true;
        return false;
      });

      ws.send(
        WS_ACTIONS.WS_CHANGE_VISIBLE_MARK(path, e.target.id, !mark.visible)
      );
    }
  };

  const handlerVisibleLayer = (e) => {
    dispatch(LAYERS_ACTIONS.CHANGE_VISIBLE_LAYER(e.target.id));
  };
  const hendlerSubmit = (e) => {
    if (e.key === 'Enter') {
      submitRef.current.click();
    }
  };

  const handlerVisibleAllLayer = () => {
    dispatch(LAYERS_ACTIONS.CHANGE_VISIBLE_ALL_LAYERS(!visibleAllLayer));

    setVisibleAllLayer(!visibleAllLayer);
  };

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
        <summary
          style={{
            position: 'relative',
            color: '#000',
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          <button
            style={{ position: 'absolute', left: 0 }}
            onClick={handlerVisibleAllLayer}
          >
            <img
              style={{
                width: '14px',
                verticalAlign: 'middle',
                align: 'left',
                cursor: 'pointer',
              }}
              alt='iconEye'
              {...(visibleAllLayer ? { src: iconEye } : { src: iconEyeClose })}
            />
          </button>
          СЛОИ
        </summary>

        {layers.map((empty, index, layers) => {
          // тут произошел обратный перебор массива
          return (
            <div
              key={layers[layers.length - 1 - index][0]}
              className={styles.task}
            >
              <button>
                <img
                  onClick={handlerVisibleLayer}
                  id={layers[layers.length - 1 - index][0]}
                  style={{
                    width: '14px',
                    verticalAlign: 'middle',
                    cursor: 'pointer',
                  }}
                  alt='iconEye'
                  {...(layers[layers.length - 1 - index][1]
                    ? { src: iconEye }
                    : { src: iconEyeClose })}
                />
              </button>
              <p>{`Слой ${layers.length - 1 - index}`}</p>
            </div>
          );
        })}
      </details>

      <Modal active={modalActive} setActive={setModalActive}>
        <div className={styles.messageContainer}>
          {markArr
            .find((el) => el.id === curentOpenId)
            ?.messages.map((message, index) => {
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

                  <span className={styles.messageSpan}>
                    <Linkify>{message.value}</Linkify>
                  </span>
                  <div className={styles.deleteMessageBtn}>
                    {index > 0 && user.name === message.user ? (
                      <button>
                        <img
                          onClick={handlerDeleteMessage}
                          id={message.data}
                          style={{
                            width: '14px',
                            verticalAlign: 'middle',
                            cursor: 'pointer',
                          }}
                          src={iconDelete}
                          alt='del'
                        />
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })}
        </div>
        {user.role === 'admin' || user.role === 'worker' ? (
          <div className={styles.modalInput}>
            <form onSubmit={handlerAddMessage} action=''>
              <textarea
                onKeyPress={hendlerSubmit}
                required
                style={{ resize: 'none' }}
                rows='4'
                onChange={handlerCurentMessage}
                value={curentMessage}
              ></textarea>
              <button ref={submitRef} className={styles.buttonAdd}>
                Добавить
              </button>
            </form>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default SidePanel;
