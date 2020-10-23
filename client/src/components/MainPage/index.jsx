import React from 'react';
import { Link } from 'react-router-dom';
import chatAni1 from '../../images/ezgif-3-02ca5a422a98.webp';
import chatAni2 from '../../images/ezgif-3-433ba8eae823.webp';
import chatAni3 from '../../images/ezgif-3-485ee7948c13.webp';
import chatAni4 from '../../images/ezgif-3-ba0e1c04505a.webp';
import chatAni5 from '../../images/ezgif-3-c9fc0a60e073.webp';
import chatAni6 from '../../images/ezgif-3-c2825510fa69.webp';
import present1 from '../../images/present1.webp';
import alllogos from '../../images/alllogos.webp';

import avaN from '../../images/nikita.webp';
import avaA from '../../images/alex.webp';
import avaC from '../../images/const.webp';

import styles from './style.module.css';

const MainPage = () => {
  const chatArr = [chatAni1, chatAni2, chatAni3, chatAni4, chatAni5, chatAni6];

  return (
    <>
      <p className={styles.text}>
        Перед вами сервис, созданный для координации работы команды переводчиков
        манги (комиксов). В процессе работы участники команды сталкиваются с
        рядом организационных проблем и наш сервис готов их решить.
      </p>

      <h1 className={styles.title}>Проблемы, которые мы решаем:</h1>

      <h1 className={styles.title}>
        1. Проблема позиционирования перевода отностилельно оригинала.
      </h1>
      <p className={styles.text}>
        В связи со спецификой материала первой возникает проблема
        позиционирования. На каждой странице любой манги находится множество
        небольших фрагментов текста, а также звуков, которые нужно перевести.
        Очень часто переводчику неудобно работать в сложных и громоздких
        приложениях, вроде Photoshop'а, чтобы явно указать соответсвие между
        оригиналом и переводом. Мы решаем эту проблему путем проставления
        виртуальных меток.
      </p>
      <div className={styles.container}>
        <img src={present1} alt='' />
      </div>

      <h1 className={styles.title}>
        2. Проблема позиционирования редакторских правок и их обсуждения.
      </h1>
      <p className={styles.text}>
        Аналогичная проблема возникает при работе редактора, которая отягощается
        тем, что каждая правка требует также обсуждения. Как правило такие
        обсуждения проходят в мессенджерах и в проекте длинной больше 3 страниц
        превращаются в настоящий "кошмар". Наш проект решает и эту проблему за
        счет того, что у каждой виртуальной метки есть свой собственный чат.
      </p>
      <div className={styles.chat}>
        {chatArr.map((chatAni, index) => {
          return <img key={index} src={chatAni} alt='' />;
        })}
      </div>

      <h1 className={styles.title}>
        3. Отслеживание состояния документа без использования Photoshop.
      </h1>
      <p className={styles.text}>
        Следующая важная задача, которую мы решаем — синхронизация актуальной
        версии рабочих файлов между участниками команды и эмитация функционала
        слоев Photoshop'а онлайн. Все рабочие файлы команды хранятся в облачном
        хранилище Яндекс.Диск. Наш сервис также подключен к этому хранилищу и
        всегда оперирует файлами со всеми актуальными изменениями. При открытии
        файла на сайте пользователь видит весь набор слоев, аналогичный
        оригиналу. Также реализовано включение и отключение видимости каждого
        слоя по отдельности. Эти функции необходимы для упрощения работы
        участников команды, которые по тем или иным причинам (не хватает
        ресурсов компьютера или установлена неподходящая ОС) не пользуются
        Photoshop'ом. Таким образом любой участник команды может увидеть
        актуальное состояние проекта на любом устройтве и проконтролировать
        порядок и содержание слоев .psd файла без необходимости запуска сложных
        и требовательных приложений.
      </p>

      <h1 className={styles.title}>Использованные технологии:</h1>
      <div className={styles.container}>
        <img src={alllogos} alt='' />
      </div>

      <h1 className={styles.title}>
        Чтобы войти на сайт вы можете перейти на страницу{' '}
        <Link className={styles.title} to='/signIn'>
          ВОЙТИ
        </Link>{' '}
        и, нажав кнопку "Демонстрация", зайти на сайт в режиме "только для
        чтения".
      </h1>

      <h1 className={styles.title}>Над проектом работали:</h1>

      <div className={styles.chat}>
        <a href='https://github.com/jrdAlexandr'>
          <figure>
            <img src={avaA} alt='ava' />
            <figcaption>Александр Шкляев</figcaption>
          </figure>
        </a>

        <a href='https://github.com/constantinoPL'>
          <figure>
            <img src={avaC} alt='ava' />
            <figcaption>Константин Плахетко</figcaption>
          </figure>
        </a>

        <a href='https://github.com/modox94'>
          <figure>
            <img src={avaN} alt='ava' />
            <figcaption>Никита Новоселов</figcaption>
          </figure>
        </a>
      </div>
    </>
  );
};

export default MainPage;
