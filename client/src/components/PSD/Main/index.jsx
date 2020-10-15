import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import NavMap from '../../scenes/NavMap';
import ImagesContainer from '../ImagesContainer';
import SidePanel from '../SidePanel';

import styles from './style.module.css';

const PSD = () => {
  const [modalActive, setModalActive] = useState();
  const [curentOpenId, setCurentOpenId] = useState('');
  const { path } = useParams();
  const pathArr = path.split('|');
  const params = pathArr.slice(0, -1).join('|');
  const fileName = pathArr[pathArr.length - 1];

  return (
    <>
      <NavMap params={params} fileName={fileName} />
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
    </>
  );
};

export default PSD;
