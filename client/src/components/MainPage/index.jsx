import React from 'react';
import chatAni1 from '../../images/ezgif-3-02ca5a422a98.webp';
import chatAni2 from '../../images/ezgif-3-433ba8eae823.webp';
import chatAni3 from '../../images/ezgif-3-485ee7948c13.webp';
import chatAni4 from '../../images/ezgif-3-ba0e1c04505a.webp';
import chatAni5 from '../../images/ezgif-3-c9fc0a60e073.webp';
import chatAni6 from '../../images/ezgif-3-c2825510fa69.webp';
import chatAni7 from '../../images/ezgif-3-dce7626e9bdf.webp';
import present1 from '../../images/present1.webp';
import alllogos from '../../images/alllogos.webp';

import avaN from '../../images/nikita.webp';
import avaA from '../../images/alex.webp';
import avaC from '../../images/const.webp';

import styles from './style.module.css';

const MainPage = () => {
  const chatArr = [
    chatAni1,
    chatAni2,
    chatAni3,
    chatAni4,
    chatAni5,
    chatAni6,
    chatAni7,
  ];

  return (
    <>
      <h1 className={styles.text}>Проблемы, которые мы решаем:</h1>

      <h1 className={styles.text}>
        1. Проблема позиционирования перевода отностилельно оригинала;
      </h1>
      <div className={styles.container}>
        <img src={present1} alt='' />
      </div>

      <h1 className={styles.text}>
        2. Проблема позиционирования редакторских правок и их обсуждения;
      </h1>
      <div className={styles.chat}>
        {chatArr.map((chatAni, index) => {
          return <img key={index} src={chatAni} alt='' />;
        })}
      </div>

      <h1 className={styles.text}>
        3. Отслеживание состояния документа без использования Photoshop.
      </h1>

      <h1 className={styles.text}>Использованные технологии:</h1>
      <div className={styles.container}>
        <img src={alllogos} alt='' />
      </div>

      <h1 className={styles.text}>Над проектом работали:</h1>

      <div className={styles.chat}>
        <figure>
          <img src={avaA} alt='ava' />
          <figcaption>Александр Шкляев</figcaption>
        </figure>

        <figure>
          <img src={avaC} alt='ava' />
          <figcaption>Константин Плахетко</figcaption>
        </figure>

        <figure>
          <img src={avaN} alt='ava' />
          <figcaption>Никита Новоселов</figcaption>
        </figure>
      </div>
    </>
  );
};

export default MainPage;
