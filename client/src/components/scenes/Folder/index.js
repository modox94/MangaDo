import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.css';

export default ({ name, preUrl }) => {
  return preUrl ? (
    <Link className={styles.folder} to={`/catalog/${preUrl}|${name}`}>
      <div>{name}</div>
    </Link>
  ) : (
    <Link className={styles.folder} to={`/catalog/${name}`}>
      <div>{name}</div>
    </Link>
  );
};
