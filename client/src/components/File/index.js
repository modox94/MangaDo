import React from 'react';
//import styles from './style.module.css';
import { Link } from 'react-router-dom';

export default ({ data }) => {
  // console.log('data from file', data);

  return (
    <Link to={data.url}>
      <img
        src={process.env.REACT_APP_SERVER_PATH + data.preview}
        alt='preview'
      />
    </Link>
  );
};
