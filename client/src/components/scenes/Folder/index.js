import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './style.module.css';

const Folder = ({ name, preUrl }) => preUrl ? (
    <Link className={styles.folder} to={`/catalog/${preUrl}|${name}`}>
      <div>{name}</div>
    </Link>
  ) : (
    <Link className={styles.folder} to={`/catalog/${name}`}>
      <div>{name}</div>
    </Link>
  );

Folder.propTypes = {
  name: PropTypes.string,
  preUrl: PropTypes.string,
};

export default Folder;
