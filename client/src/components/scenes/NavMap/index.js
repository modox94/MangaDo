import React from 'react';
import { Link } from 'react-router-dom';
import NavItem from '../NavItem';

import styles from './style.module.css';
import stylesNavItem from '../NavItem/style.module.css';

export default ({ params, fileName }) => {
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
      <span className={stylesNavItem.link}>
        <Link
          to={
            '/psd/' + (params && fileName ? params + '|' + fileName : fileName)
          }
        >
          <div>{fileName}</div>
        </Link>
      </span>
    </div>
  );
};
