import React from 'react';
import './style.module.css';

export default () => {
  return (
    <form>
      <div className='container'>
        <h1>Register</h1>
        <br />
        <p>Please fill in this form to create an account.</p>
        <br />
        <label htmlFor='invite'>
          <b>Invite</b>
        </label>
        <input type='text' placeholder='Invite' name='invite' required />
        <label htmlFor='name'>
          <b>Name</b>
        </label>
        <input type='text' placeholder='Enter your Name' name='name' required />

        <label htmlFor='psw'>
          <b>Password</b>
        </label>
        <input
          type='password'
          placeholder='Enter Password'
          name='psw'
          required
        />

        <button type='submit' className='registerbtn'>
          Register
        </button>
      </div>
    </form>
  );
};
