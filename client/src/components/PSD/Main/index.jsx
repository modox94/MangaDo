import React, { useEffect, useState } from 'react';
import ImagesContainer from '../ImagesContainer';
import SidePanel from '../SidePanel';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as URL_ACTIONS from '../../../redux/actions/url/url';

import styles from './style.module.css';

const PSD = () => {

  const [modalActive, setModalActive] = useState();
  const [curentOpenId, setCurentOpenId] = useState('');
  return (
    <div className={styles.wrapper}>
      <ImagesContainer setModalActive={setModalActive} setCurentOpenId={setCurentOpenId}/>
      <SidePanel setModalActive={setModalActive} curentOpenId={curentOpenId} modalActive={modalActive} setCurentOpenId={setCurentOpenId} />
    </div>
  );
};

export default PSD;
