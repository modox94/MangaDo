import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import styles from './style.module.css';

export default ({name}) => {
  
  return (
    <div className={styles.folder}>
      <Link to={`/catalog/${name}`}>
        {name}
      </Link>
      
    </div>
  )
}
