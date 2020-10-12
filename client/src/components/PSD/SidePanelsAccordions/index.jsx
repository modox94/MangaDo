import React from 'react';
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
  return (
    <details className={styles.accordion}>
      <summary style={{ color: color }}>{title}</summary>
      <form onSubmit={(e) => handlerAddMark(e, type, inputTitleValue)}>
        <textarea
          required
          rows='4'
          onChange={inputTitle}
          value={inputTitleValue}
        ></textarea>
        <button className={styles.buttonAdd}>Добавить</button>
      </form>
      {markArr.map((mark) => {
        return (
          <div key={mark.id} className={styles.task}>
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
            <p
              onClick={() => {
                setModalActive(true);
                setCurentOpenId(mark.id);
              }}
            >
              {mark.messages[0].value}
            </p>
            <button>
              <img
                onClick={handlerDelete}
                id={mark.id}
                style={{ width: '14px', verticalAlign: 'middle' }}
                src={iconDelete}
                alt=''
              />
            </button>
          </div>
        );
      })}
    </details>
  );
};

export default SidePanelsAccordions;
