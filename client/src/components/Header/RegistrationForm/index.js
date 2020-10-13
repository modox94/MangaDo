import React, { useRef, useState } from 'react';
import './style.module.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as ACTIONS_TYPES from '../../../redux/action-types';

export default () => {
  const [err, setErr] = useState();
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
    } else {
      const err = await response.json();
      console.log('>>>>>>', err);
      setErr(err.message);
    }
  };

  return (
    <form onSubmit={registration}>
      <div className='container'>
        <h1>Register</h1>
        <br />
        <p>Please fill in this form to create an account.</p>
        <br />
        <label htmlFor='invite'>
          <b>Invite</b>
        </label>
        <input type='text' ref={inputInvite} placeholder='Invite' required />
        <label htmlFor='name'>
          <b>Name</b>
        </label>
        <input
          type='text'
          ref={inputName}
          placeholder='Enter your Name'
          name='name'
          required
        />

        <label htmlFor='psw'>
          <b>Password</b>
        </label>
        <input
          type='password'
          ref={inputPsw}
          placeholder='Enter Password'
          required
        />

        {err && <p>{err}</p>}

        <button type='submit' className='registerbtn'>
          Register
        </button>
      </div>
    </form>
  );
};
