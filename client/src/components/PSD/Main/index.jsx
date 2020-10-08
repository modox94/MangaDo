import React from 'react';
import { useParams } from 'react-router-dom';
import ImagesContainer from '../../ImagesContainer';
import SidePanel from '../../SidePanel';
import styles from './style.module.css';

const PSD = () => {
  return (
    <div className={styles.wrapper}>
      <ImagesContainer />
      <SidePanel />
    </div>
  );
};

export default PSD;
