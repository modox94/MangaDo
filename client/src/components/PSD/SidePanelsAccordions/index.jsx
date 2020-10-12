import React from 'react';
import { useSelector } from 'react-redux';

import iconEye from '../../../icons/eye.png';
import iconEyeClose from '../../../icons/eyeclose.png';
import iconDelete from '../../../icons/delete.png';
import styles from './style.module.css';

const SidePanelsAccordions = ({
  inputTitle,
  inputTitleValue,
  type,
  handlerAddMark,
  markArr,
  handlerVisible,
  setModalActive,
  setCurentOpenId,
  handlerDelete,
  color,
  title,
}) => {
  const user = useSelector((state) => state.user);

  return (
    <details className={styles.accordion}>
      <summary style={{ color: color }}>{title}</summary>
      {user.role === 'admin' || user.role === 'worker' ? (
        <>
          <textarea
            rows='4'
            onChange={inputTitle}
            value={inputTitleValue}
          ></textarea>
          <button
            className={styles.buttonAdd}
            onClick={() => handlerAddMark(type, inputTitleValue)}
          >
            Добавить
          </button>
        </>
      ) : null}
      {markArr.map((mark) => {
        return (
          <div key={mark.id} className={styles.task}>
            {user.role === 'admin' || user.role === 'worker' ? (
              <button>
                {mark.visible ? (
                  <img
                    onClick={handlerVisible}
                    id={mark.id}
                    style={{ width: '14px', verticalAlign: 'middle' }}
                    src={iconEye}
                    alt=''
                  />
                ) : (
                  <img
                    onClick={handlerVisible}
                    id={mark.id}
                    style={{ width: '14px', verticalAlign: 'middle' }}
                    src={iconEyeClose}
                    alt=''
                  />
                )}
              </button>
            ) : null}
            <p
              onClick={() => {
                setModalActive(true);
                setCurentOpenId(mark.id);
              }}
            >
              {mark.messages[0].value}
            </p>

            {user.role === 'admin' ||
            (user.role === 'worker' && user.name === mark.creator) ? (
              <button>
                <img
                  onClick={handlerDelete}
                  id={mark.id}
                  style={{ width: '14px', verticalAlign: 'middle' }}
                  src={iconDelete}
                  alt=''
                />
              </button>
            ) : null}
          </div>
        );
      })}
    </details>
  );
};

export default SidePanelsAccordions;
