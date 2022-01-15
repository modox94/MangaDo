import React from 'react';
import PropTypes from 'prop-types';
import closeModalIcon from '../../../icons/close.png';
import styles from './style.module.css';

const Modal = ({ active, setActive, children }) => {
  return (
    <div
      className={`${styles.modal} ${active ? styles.active : null}`}
      onClick={() => {
        setActive(false);
      }}
    >
      <div
        className={
          active
            ? `${styles.modal__content} ${styles.active}`
            : styles.modal__content
        }
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            setActive(false);
          }}
          className={styles.closeModalBtn}
        >
          <img src={closeModalIcon} alt='' />
        </button>

        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func,
  children: PropTypes.any,
};

export default Modal;
