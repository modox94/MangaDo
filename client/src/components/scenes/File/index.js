import React from 'react';
import { Link } from 'react-router-dom';

import './style.module.css';

export default ({ data, name }) => {
  return (
    <figure>
      <Link to={data.url}>
        <img
          src={process.env.REACT_APP_SERVER_PATH + data.preview}
          alt='preview'
        />
      </Link>
      <figcaption>{name + '.psd'}</figcaption>
    </figure>
  );
};

/*

<figure class = "frog">
 <img src = "frog.png">
 <figcaption>Лягушка</figcaption>
</figure>

*/
