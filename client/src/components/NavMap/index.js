import React, { useEffect, useState } from 'react';
import styles from './style.module.css';

import NavItem from '../NavItem';

export default ({ params }) => {
  let names = '';
  if (params) {
    names = params?.lastIndexOf('|') === -1 ? [params] : params.split('|');
  }

  // console.log('params in NavMap =', params);
  // console.log(names);
  return (
    <div className={styles.navbar}>
      {names &&
        names.map((name, index) => (
          <NavItem name={name} url={names.slice(0, index + 1).join('|')} />
        ))}
    </div>
  );
};
