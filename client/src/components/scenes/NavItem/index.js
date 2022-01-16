import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './style.module.css';

const NavItem = ({ name, url }) => {
  return (
    <span className={styles.link}>
      <Link to={`/catalog/${url}`}>
        <div>{name + '/'}</div>
      </Link>
    </span>
  );
};

NavItem.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
};

export default NavItem;
