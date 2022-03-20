import './Login.scss'

import React, { useEffect, useState } from 'react';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [blankPassword, setBlankPassword] = useState('')
  const [blankUsername, setBlankUsername] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const loginUser = (event) => {
    event.preventDefault()
    usernameVerif()
    passwordVerif()
       
    if (username !== '' && password !== '') {
      let informations = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      };
      fetch(`/api/login`, informations)
        .then(response => {
          return (response.json())
        }).then(token => {
          if (token && token.error) {

            return
          }


          setErrorMsg(<p style={{ color: 'red' }}>{token.message}</p>)
          if (token["data"]["token"]) {
            localStorage.setItem('access_token', token["data"]["token"]);
            //localStorage.setItem('id', token.id)

            if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token") !== "undefined") {
              window.location.replace("/")
            }
          }
        })
    }
  }
  const validate = (data) => {
    let errors = {};


    if (!data.email) {
      errors.email = 'Email is required.';
    }


    if (!data.password) {
      errors.password = 'Password is required.';
    }

    return errors;
  };
  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };

  const usernameVerif = () => {
    if (username === '') {
      setBlankUsername(<p style={{ color: "white", fontSize: "calc(0.3rem + 0.4vw)", fontStyle: "italic" }}>Champ requis</p>)
    }
    else setBlankUsername('')

  }

  const passwordVerif = () => {
    if (password === '') {
      setBlankPassword(<p style={{ color: "white", fontSize: "calc(0.3rem + 0.4vw)", fontStyle: "italic" }}>Champ requis</p>)
    }
    else setBlankPassword('')

  }



  return (
    <div className="login">

      <form className="p-fluid" validate={validate}>

        <div className="field">
          <span className="p-input-icon-right">
            <i className="pi pi-envelope" />
            
            <InputText id="email" name="email" placeholder='Email*' value={username} onChange={(e) => setUsername(e.target.value)} className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
          </span>
          {getFormErrorMessage('email')}
        </div>

        <div className="field">
          <span className="p-input-icon-right">
            
            <Password id="password" placeholder='Password*' feedback={false} name="password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask
              className={classNames({ 'p-invalid': isFormFieldValid('password') })} />
          </span>
          {getFormErrorMessage('password')}
        </div>

        <Button onClick={loginUser} label="Login" className="login-button" />
      </form>

    </div>
  )

} export default Login;