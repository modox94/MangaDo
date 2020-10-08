import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import {Link} from 'react-router-dom';


export default ({params}) => {
  const names = (params.lastindexOf('|') === -1) ?  [params] : params.split('|');
  return (
    <div className={styles.navbar}>
        {names.map(name => )}
    </div>
  )
}
