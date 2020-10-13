import React from 'react';
import styles from './style.module.css';

import NavItem from '../NavItem';

export default ({ params }) => {
  let names = '';
  if (params) {
    names = params?.lastIndexOf('|') === -1 ? [params] : params.split('|');
  }

  return (
    <div className={styles.navbar}>
      <NavItem name='/catalog' url={''} />
      {names &&
        names.map((name, index) => (
          <NavItem
            key={name}
            name={name}
            url={names.slice(0, index + 1).join('|')}
          />
        ))}
    </div>
  );
};
