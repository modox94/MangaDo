import React from 'react';
import { Link } from 'react-router-dom';

export default ({ data }) => {
  return (
    <Link to={data.url}>
      <img
        src={process.env.REACT_APP_SERVER_PATH + data.preview}
        alt='preview'
      />
    </Link>
  );
};
