import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ModalSpinner from '../../ModalSpinner';
import Folder from '../Folder';
import File from '../File';
import NavMap from '../NavMap';

import styles from './style.module.css';
import stylesPSD from '../../PSD/ImagesContainer/style.module.css';

export default () => {
  const { params } = useParams();

  const [data, setData] = useState({ folders: [] });
  const [spinner, setSpinner] = useState(true);

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
      setSpinner(false);
    })();
  }, [params]);

  return (
    <>
      {spinner ? (
        <ModalSpinner>
          <div className={stylesPSD.loader}>Loading...</div>
        </ModalSpinner>
      ) : (
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
      )}
    </>
  );
};
