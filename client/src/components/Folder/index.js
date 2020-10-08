import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import styles from './style.module.css';

export default ({name, preUrl}) => {
  const { params } = useParams();
  // console.log('folder params =', params);

  return preUrl ?  (
  <Link to={`/catalog/${preUrl}|${name}`}>
    <div className={styles.folder}>
    {name}
    </div>
  </Link>
  ) : (
  <Link to={`/catalog/${name}`}>
     <div className={styles.folder}>
    {name}
    </div>
  </Link>
  )
}
