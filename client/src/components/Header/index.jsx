import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { USER_LOGOUT } from '../../redux/action-types';
import styles from './style.module.css';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t] = useTranslation('header');

  const logout = () => {
    dispatch({ type: USER_LOGOUT });
    navigate('/signIn');
  };
  const user = useSelector((store) => store.user.name);
  return (
    <header>
      <nav>
        <Link className={styles.link} to="/">
          {t('main')}
        </Link>

        {user ? (
          <>
            <Link className={styles.link} to="/catalog">
              {t('catalog')}
            </Link>
            <button
              type="button"
              onClick={logout}
              className={classnames(styles.linkButton, styles.link)}
            >
              {t('exit')}
            </button>
          </>
        ) : (
          <>
            <Link className={styles.link} to="/signUp">
              {t('signUp')}
            </Link>
            <Link className={styles.link} to="/signIn">
              {t('signIn')}
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
