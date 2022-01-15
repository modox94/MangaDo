import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as ACTIONS_TYPES from '../../redux/action-types';
import styles from './style.module.css';

const LogInForm = () => {
  const inputName = useRef();
  const inputPsw = useRef();

  const dispatch = useDispatch();

  const history = useHistory();

  const [err, setErr] = useState();

  const login = async (e) => {
    e.preventDefault();
    let user = {
      name: inputName.current.value,
      psw: inputPsw.current.value,
    };
    const response = await fetch(
      new URL('user/login', process.env.REACT_APP_SERVER_PATH),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user),
      }
    );
    if (response.ok) {
      const result = await response.json();

      dispatch({
        type: ACTIONS_TYPES.USER_LOGIN,
        payload: result,
      });
      history.push('/catalog');
    } else {
      const err = await response.json();

      setErr(err.message);
    }
  };

  const demo = async () => {
    let user = {
      name: 'demo',
      psw: 'demo',
    };
    const response = await fetch(
      new URL('user/login', process.env.REACT_APP_SERVER_PATH),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user),
      }
    );
    if (response.ok) {
      const result = await response.json();

      dispatch({
        type: ACTIONS_TYPES.USER_LOGIN,
        payload: result,
      });
      history.push('/catalog');
    } else {
      const err = await response.json();

      setErr(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Войти</h1>

      <p>Пожалуйста, заполните эту форму, чтобы войти.</p>

      <form className={styles.formcontainer} onSubmit={login}>
        <label htmlFor='name'>
          <b>Имя</b>
        </label>
        <input
          type='text'
          ref={inputName}
          placeholder='Введите своё имя'
          required
        />

        <label htmlFor='psw'>
          <b>Пароль</b>
        </label>
        <input
          type='password'
          ref={inputPsw}
          placeholder='Введите пароль'
          required
        />
        {err && <p className={styles.err}>{err}</p>}
        <button type='submit' className='registerbtn'>
          Войти
        </button>
        <button onClick={demo} type='button' className='registerbtn'>
          Демонстрация
        </button>
      </form>
    </div>
  );
};

export default LogInForm;
