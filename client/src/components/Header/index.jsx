import React from 'react';
import styles from './style.module.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as ACTIONS_TYPES from '../../redux/action-types';



const Header = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: ACTIONS_TYPES.USER_LOGOUT, });
    history.push('/signIn')
  } 

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
        <a onClick={logout} href="#" className={styles.link} >
          Выйти
        </a>
      </nav>
    </header>
  );
};
export default Header;
