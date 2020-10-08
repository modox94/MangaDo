import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './style.module.css';
import Folder from '../../Folder';
import File from '../../File';
import NavMap from '../../NavMap';

export default () => {
  const { params } = useParams();
  console.log('params = ', params);
  const [data, setData] = useState({ folders: [] });

  useEffect(() => {
    (async () => {
      let response;
      if (params) {
        response = await fetch(`http://localhost:3005/catalog/${params}`);
      } else response = await fetch(`http://localhost:3005/catalog/`);
      const result = await response.json();
      setData(result);
      console.log('result = ', result);
    })();
  }, [params]);

  console.log('board data = ', data);
  return (
    <>
      <NavMap params={params} />
      <div className={styles.board}>
        {data.files &&
          Object.keys(data.files).map((key) => (
            <File key={key} data={data.files[key]} />
          ))}
        {data.folders?.length &&
          data.folders.map((el) => (
            <Folder key={el} name={el} preUrl={params} />
          ))}
      </div>
    </>
  );
};
