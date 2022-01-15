import React from 'react';
import styles from './style.module.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as ACTIONS_TYPES from '../../redux/action-types';
import { useSelector } from 'react-redux';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: ACTIONS_TYPES.USER_LOGOUT });
    history.push('/signIn');
  };
  const user = useSelector((store) => store.user.name);
  return (
    <header>
      <nav>
        <Link className={styles.link} to='/'>
          Главная
        </Link>

        {user ? (
          <>
            <Link className={styles.link} to='/catalog'>
              Каталог
            </Link>
            <a onClick={logout} href='#' className={styles.link}>
              Выйти
            </a>
          </>
        ) : (
          <>
            <Link className={styles.link} to='/signUp'>
              Зарегистрироваться
            </Link>
            <Link className={styles.link} to='/signIn'>
              Войти
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
