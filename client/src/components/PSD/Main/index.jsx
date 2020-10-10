import React, { useEffect } from 'react';
import ImagesContainer from '../ImagesContainer';
import SidePanel from '../SidePanel';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as URL_ACTIONS from '../../../redux/actions/url/url';

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
