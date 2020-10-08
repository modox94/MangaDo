import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './style.module.css';
import Folder from '../../Folder';
import File from '../../File';

export default () => {
  const { params } = useParams();
  console.log('params = ', params);
  const [data, setData] = useState({ folders: [] });

  useEffect(() => {
    (async () => {
      let response;
      if (params) {
        response = await fetch(
          new URL('catalog/' + params, process.env.REACT_APP_SERVER_PATH)
        );
      } else
        response = await fetch(
          new URL('catalog/', process.env.REACT_APP_SERVER_PATH)
        );
      const result = await response.json();
      setData(result);
      console.log('result = ', result);
    })();
  }, [params]);

  console.log('board data = ', data);
  return (
    <>
      <div>{params}</div>
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
