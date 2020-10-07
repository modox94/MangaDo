import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './style.module.css';
import Folder from '../../Folder';
import File from '../../File';

export default () => {
  const { params } = useParams();
  console.log('params = ', params);
  const [data, setData] = useState({folders: [], files: []});
  const {folders, files} = data;
  useEffect(() => {
   ( async () =>{
    let response;
     if(params) {
      response = await fetch(`http://localhost:3005/catalog/${params}`);
     } else response = await fetch(`http://localhost:3005/catalog/`);
     
    const result = await response.json();
    setData(result);
    console.log('result = ', result);
    })();
  }, [params])

  return (
    <div className={styles.board}>
      {folders?.length && folders.map(el => <Folder key={el} name={el}/>)}
      {files?.length && Object.keys(files).map(key => <File key={key} data={files[key]}/>)}
    </div>
  )
}
