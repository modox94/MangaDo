import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import iconDelete from '../../../icons/delete.png';
import iconEye from '../../../icons/eye.png';
import iconEyeClose from '../../../icons/eyeclose.png';
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
      <summary style={{ color }}>{title}</summary>
      {user.role === 'admin' || user.role === 'worker' ? (
        <form onSubmit={(e) => handlerAddMark(e, type, inputTitleValue)}>
          <textarea
            required
            rows="4"
            onChange={inputTitle}
            value={inputTitleValue}
          />
          <button type="submit" className={styles.buttonAdd}>
            Добавить
          </button>
        </form>
      ) : null}
      {markArr.map((mark) => (
        <div key={mark.id} className={styles.task}>
          {(user.role === 'admin' || user.role === 'worker') && (
            <button type="button" onClick={handlerVisible}>
              {mark.visible ? (
                <img
                  id={mark.id}
                  style={{
                    width: '14px',
                    verticalAlign: 'middle',
                    cursor: 'pointer',
                  }}
                  src={iconEye}
                  alt=""
                />
              ) : (
                <img
                  id={mark.id}
                  style={{ width: '14px', verticalAlign: 'middle' }}
                  src={iconEyeClose}
                  alt=""
                />
              )}
            </button>
          )}
          <p
            onClick={() => {
              setModalActive(true);
              setCurentOpenId(mark.id);
            }}
          >
            {mark.messages[0].value}
          </p>

          {user.role === 'admin' ||
            (user.role === 'worker' && user.name === mark.creator && (
              <button type="button" onClick={handlerDelete}>
                <img
                  id={mark.id}
                  style={{
                    width: '14px',
                    verticalAlign: 'middle',
                    cursor: 'pointer',
                  }}
                  src={iconDelete}
                  alt=""
                />
              </button>
            ))}
        </div>
      ))}
    </details>
  );
};

SidePanelsAccordions.propTypes = {
  inputTitle: PropTypes.func,
  inputTitleValue: PropTypes.string,
  type: PropTypes.string,
  handlerAddMark: PropTypes.func,
  markArr: PropTypes.array,
  handlerVisible: PropTypes.func,
  setModalActive: PropTypes.func,
  setCurentOpenId: PropTypes.func,
  handlerDelete: PropTypes.func,
  color: PropTypes.string,
  title: PropTypes.string,
};

export default SidePanelsAccordions;
