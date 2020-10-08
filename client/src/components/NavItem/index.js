import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import { Link } from 'react-router-dom';

export default ({ name, url }) => {
  return (
    <span className={styles.link}>
      <Link to={`/catalog/${url}`}>
        <div>{name}</div>
      </Link>
    </span>
  );
};
