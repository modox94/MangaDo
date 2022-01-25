import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ModalSpinner from '../../ModalSpinner';
import File from '../File';
import Folder from '../Folder';
import NavMap from '../NavMap';
import styles from './style.module.css';

const Board = () => {
  const ws = useSelector((state) => state.websocket);

  const { params } = useParams();

  const [data, setData] = useState({ folders: [], files: {} });
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    setSpinner(false);
    (async () => {
      const response = await fetch(
        new URL(`catalog/${  params || ''}`, process.env.REACT_APP_SERVER_PATH)
      );
      const result = await response.json();

      setData(result);
      setSpinner(true);
    })();
    // TODO: пеписать в редакс получение превьюшек
  }, [params]);

  return spinner && ws ? (
    <>
      <NavMap params={params} />
      <div className={styles.board}>
        {Object.keys(data.files).length
          ? Object.keys(data.files).map((key) => (
              <File key={key} data={data.files[key]} name={key} />
            ))
          : null}
        {data.folders.length
          ? data.folders.map((el) => (
              <Folder key={el} name={el} preUrl={params} />
            ))
          : null}
      </div>
    </>
  ) : (
    <ModalSpinner />
  );
};

export default Board;
