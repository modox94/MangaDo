import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.css';

export default ({ name, preUrl }) => {
  return preUrl ? (
    <Link to={`/catalog/${preUrl}|${name}`}>
      <div className={styles.folder}>{name}</div>
    </Link>
  ) : (
    <Link to={`/catalog/${name}`}>
      <div className={styles.folder}>{name}</div>
    </Link>
  );
};
