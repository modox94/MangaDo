import React, { useState } from 'react';
import ImagesContainer from '../ImagesContainer';
import SidePanel from '../SidePanel';

import styles from './style.module.css';

const PSD = () => {
  const [modalActive, setModalActive] = useState();
  const [curentOpenId, setCurentOpenId] = useState('');
  return (
    <div className={styles.wrapper}>
      <ImagesContainer
        setModalActive={setModalActive}
        setCurentOpenId={setCurentOpenId}
      />
      <SidePanel
        setModalActive={setModalActive}
        curentOpenId={curentOpenId}
        modalActive={modalActive}
        setCurentOpenId={setCurentOpenId}
      />
    </div>
  );
};

export default PSD;
