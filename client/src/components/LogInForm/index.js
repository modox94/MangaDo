import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as ACTIONS_TYPES from '../../redux/action-types';

export default () => {
  const inputName = useRef();
  const inputPsw = useRef();

  const dispatch = useDispatch();

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
      console.log(result);
      dispatch({
        type: ACTIONS_TYPES.USER_LOGIN,
        payload: result,
      });
    }
  };

  return (
    <form onSubmit={login}>
      <h1>Login</h1>
      <br />
      <p>Please fill in this form to login.</p>
      <br />

      <label htmlFor='name'>
        <b>Name</b>
      </label>
      <input
        type='text'
        ref={inputName}
        placeholder='Enter your Name'
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

      <button type='submit' className='registerbtn'>
        Register
      </button>
    </form>
  );
};
