import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './style.module.css';

const NavItem = ({ name, url }) => (
    <span className={styles.link}>
      <Link to={`/catalog/${url}`}>
        <div>{`${name  }/`}</div>
      </Link>
    </span>
  );

NavItem.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
};

export default NavItem;
