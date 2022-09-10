/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as ACTIONS_TYPES from '../../redux/action-types';
import styles from './style.module.css';

const RegistrationForm = () => {
  const [err, setErr] = useState();
  const inputName = useRef();
  const inputInvite = useRef();
  const inputPsw = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const registration = async (e) => {
    e.preventDefault();
    const user = {
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

      dispatch({
        type: ACTIONS_TYPES.USER_LOGIN,
        payload: result,
      });
      navigate('/catalog');
    } else {
      const error = await response.json();

      setErr(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Регистрация</h1>

      <p>Пожалуйста, заполните эту форму, чтобы создать учетную запись.</p>

      <form className={styles.formcontainer} onSubmit={registration}>
        <label htmlFor="invite">
          <b>Приглашение</b>
        </label>
        <input
          id="invite"
          type="text"
          ref={inputInvite}
          placeholder="Введите приглашение"
          required
        />
        <label htmlFor="nameReg">
          <b>Имя</b>
        </label>
        <input
          id="nameReg"
          type="text"
          ref={inputName}
          placeholder="Введите ваше имя"
          required
        />

        <label htmlFor="pswReg">
          <b>Пароль</b>
        </label>
        <input
          id="pswReg"
          type="password"
          ref={inputPsw}
          placeholder="Введите пароль"
          required
        />

        {err && <p className={styles.err}>{err}</p>}

        <button type="submit" className="registerbtn">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
