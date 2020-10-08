import React, { useEffect, useState } from 'react';
//import styles from './style.module.css';
import {Link} from 'react-router-dom';


export default ({data}) => {
  
  console.log('data from file',data);

  return (
    <Link to={data.url}>
        <img src={`http://localhost:3005/${data.preview}`} alt="preview" />
      </Link>  
  )
}
