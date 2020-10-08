import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import styles from './style.module.css';

export default ({name, preUrl}) => {
  const { params } = useParams();
  console.log('folder params =', params);
  return (
    <div className={styles.folder}>
      {preUrl ?  (
      <Link to={`/catalog/${preUrl}|${name}`}>
        {name}
      </Link>
      ) : (
        <Link to={`/catalog/${name}`}>
          {name}
        </Link>
        )
      }
    </div>
  )
}
