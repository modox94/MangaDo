import React from 'react';
import { Link } from 'react-router-dom';

import styles from './style.module.css';

export default ({ name, url }) => {
  return (
    <span className={styles.link}>
      <Link to={`/catalog/${url}`}>
        <div>{name + '/'}</div>
      </Link>
    </span>
  );
};
