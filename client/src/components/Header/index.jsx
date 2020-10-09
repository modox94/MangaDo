import React from 'react';
import styles from './style.module.css';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header>
      <nav>
        <Link className={styles.link} to='/'>
          Главная
        </Link>
        <Link className={styles.link} to='/signUp'>
          Зарегистрироваться
        </Link>
        <Link className={styles.link} to='/signIn'>
          Войти
        </Link>
        <Link className={styles.link} to='/catalog'>
          Каталог
        </Link>
        <Link className={styles.link} to='/logout'>
          Выйти
        </Link>
      </nav>
    </header>
  );
};
export default Header;
