import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as ACTIONS_TYPES from '../../redux/action-types';
import styles from './style.module.css';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t] = useTranslation('header');

  const logout = () => {
    dispatch({ type: ACTIONS_TYPES.USER_LOGOUT });
    navigate('/signIn');
  };
  const user = useSelector((store) => store.user.name);
  return (
    <header>
      <nav>
        <Link className={styles.link} to='/'>
          {t('main')}
        </Link>

        {user ? (
          <>
            <Link className={styles.link} to='/catalog'>
              {t('catalog')}
            </Link>
            <a onClick={logout} href='#' className={styles.link}>
              {t('exit')}
            </a>
          </>
        ) : (
          <>
            <Link className={styles.link} to='/signUp'>
              {t('signUp')}
            </Link>
            <Link className={styles.link} to='/signIn'>
              {t('signIn')}
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
