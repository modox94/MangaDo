import React, { useRef } from 'react';
import styles from './style.module.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as ACTIONS_TYPES from '../../redux/action-types';

export default () => {
  const inputName = useRef();
  const inputInvite = useRef();
  const inputPsw = useRef();

  const dispatch = useDispatch();

  const history = useHistory();

  const registration = async (e) => {
    e.preventDefault();
    let user = {
      name: inputName.current.value,
      invite: inputInvite.current.value,
      psw: inputPsw.current.value,
    };
    const response = await fetch(
      new URL('user/registration', process.env.REACT_APP_SERVER_PATH),
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
      console.log(result);
      dispatch({
        type: ACTIONS_TYPES.USER_LOGIN,
        payload: result,
      });
      history.push('/catalog');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Регистрация</h1>

      <p>Пожалуйста, заполните эту форму, чтобы создать учетную запись.</p>

      <form className={styles.formcontainer} onSubmit={registration}>
        <label htmlFor='invite'>
          <b>Приглашение</b>
        </label>
        <input type='text' ref={inputInvite} placeholder='Введите приглашение' required />
        <label htmlFor='name'>
          <b>Имя</b>
        </label>
        <input
          type='text'
          ref={inputName}
          placeholder='Введите ваше имя'
          name='name'
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

        <button type='submit' className='registerbtn'>
        Зарегистрироваться
        </button>
      </form>
    </div>
  );
};
