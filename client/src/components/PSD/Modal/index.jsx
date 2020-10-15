import React from 'react';
import styles from './style.module.css';
import closeModalIcon from '../../../icons/closecrosscircularinterfacebutton_105037.png';

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

export default Modal;
