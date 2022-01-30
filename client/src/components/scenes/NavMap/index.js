import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavItem from '../NavItem';
import stylesNavItem from '../NavItem/style.module.css';
import styles from './style.module.css';

const NavMap = ({ params, fileName }) => {
  let names = '';
  if (params) {
    names = params?.lastIndexOf('|') === -1 ? [params] : params.split('|');
  }

  return (
    <div className={styles.navbar}>
      <NavItem name="/catalog" url="" />
      {names &&
        names.map((name, index) => (
          <NavItem
            key={name}
            name={name}
            url={names.slice(0, index + 1).join('|')}
          />
        ))}
      <span className={stylesNavItem.link}>
        <Link to={`/psd/${params ? `${params}|` : ''}${fileName}`}>
          <div>{fileName}</div>
        </Link>
      </span>
    </div>
  );
};

NavMap.propTypes = {
  params: PropTypes.string,
  fileName: PropTypes.string,
};

export default NavMap;
