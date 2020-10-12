import React from 'react';
import cn from 'classnames';

import styles from './style.module.css';

const Modal = ({ children }) => {
  return (
    <div
      className={styles.modal}>
      <div
        className={
        styles.modal__content}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
