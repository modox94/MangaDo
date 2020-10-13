import React from 'react';

import styles from './style.module.css';

const Modal = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.loader}>Loading...</div>
    </div>
  );
};

export default Modal;
