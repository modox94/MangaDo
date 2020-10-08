import React, { useEffect, useState } from 'react';
//import styles from './style.module.css';

export default ({data}) => {
  
  console.log('data from file',data);

  return (
     <div>
       <img src={`http://localhost:3005/${data.preview}`} alt="preview" />
     </div>
  )
}
