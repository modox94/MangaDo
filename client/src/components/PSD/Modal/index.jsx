import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import closeModalIcon from '../../../icons/close.png';
import styles from './style.module.css';

const Modal = ({ active, setActive, children }) => (
  <div
    className={classNames(styles.modal, { [styles.active]: active })}
    onClick={() => setActive(false)}
  >
    <div
      className={classNames(styles.modal__content, { [styles.active]: active })}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => setActive(false)}
        className={styles.closeModalBtn}
      >
        <img src={closeModalIcon} alt="" />
      </button>

      {children}
    </div>
  </div>
);

Modal.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func,
  children: PropTypes.any,
};

export default Modal;
