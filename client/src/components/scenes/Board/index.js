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
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    setSpinner(true);
    (async () => {
      const response = await fetch(
        new URL(`catalog/${params || ''}`, process.env.REACT_APP_SERVER_PATH)
      );
      const result = await response.json();

      setData(result);
      setSpinner(false);
    })();
    // TODO: пеписать в редакс получение превьюшек
  }, [params]);

  if (spinner || !ws) {
    return <ModalSpinner />;
  }

  return data?.error ? (
    <span>{data?.error}</span>
  ) : (
    <>
      <NavMap params={params} />
      <div className={styles.board}>
        {(Object.keys(data?.files) || []).map((key) => (
          <File key={key} data={data?.files[key]} name={key} />
        ))}
        {(data?.folders || []).map((el) => (
          <Folder key={el} name={el} preUrl={params} />
        ))}
      </div>
    </>
  );
};

export default Board;
