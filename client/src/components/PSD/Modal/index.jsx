import React from 'react';
import cn from 'classnames';

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
        {children}
      </div>
    </div>
  );
};

export default Modal;
