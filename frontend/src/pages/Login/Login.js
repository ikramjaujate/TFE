
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
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
        //console.log(username, password)        
        if(username !== '' && password !== ''){
            let informations = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({ username, password })
            };
            fetch(`/api/login`, informations)
                .then(response => {
                    return (response.json())             
                }).then(token => {
                    console.log(token["data"]["token"])
                    
                    setErrorMsg(<p style={{color:'red'}}>{token.message}</p>)
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
        if(username === ''){
            setBlankUsername(<p style={{color : "white", fontSize : "calc(0.3rem + 0.4vw)", fontStyle:"italic"}}>Champ requis</p>)
        }
        else setBlankUsername('')
        
    }

    const passwordVerif = () => {
        if(password === ''){
            setBlankPassword(<p style={{color : "white", fontSize : "calc(0.3rem + 0.4vw)", fontStyle:"italic"}}>Champ requis</p>)
        }
        else setBlankPassword('')

    }



    return (
        <>
       {/* <section class="vh-100 gradient-custom mx-md-0" style={{fontSize: "calc(0.5rem + 0.5vw", minWidth:"300px"}}>
            <div class="container  py-md-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card text-white" style={{borderRadius: "1rem", background: "#c9392f"}}>
                    <div class="card-body px-sm-3 p-md-4 text-center">

                        <div class="pb-2">

                            <form>
                                <div class="form-outline form-white mb-4">
                                
                                    <label class="form-label">Identifiant</label>
                                    <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                            </span>
                            <InputText value={username} onChange={(e) => setUsername(e.target.value)} placeholder="exemple" style={{fontSize: "calc(0.5rem + 0.5vw"}}  placeholder="First Name" />
                                    
                                    {blankUsername}
                                    
                                </div>

                                <div class="form-outline form-white mb-4">
                                    <label class="form-label">Mot de passe</label>
                                    <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*******"  style={{fontSize: "calc(0.5rem + 0.5vw"}} class="form-control form-control-lg" />
                                    {blankPassword}
                                </div>                        

                                <button class="btn btn-outline-dark text-white btn-lg px-4 px-md-5 px-lg-5" onClick={loginUser} style={{fontSize: "calc(0.7rem + 0.7vw", backgroundColor : "#494848"}}>LOGIN</button>                        
                            
                            </form>
                            {errorMsg}

                        </div>

                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    
    </>*/}
     <div className="form-login">

     <div className="flex justify-content-center mt-8">
                <div className="card">
                    <form className="p-fluid" validate={validate}>
                        
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText id="email" name="email" value={username} onChange={(e) => setUsername(e.target.value)} className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
                                <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>Email*</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <Password id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask
                                    className={classNames({ 'p-invalid': isFormFieldValid('password') })} />
                                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Password*</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                        
                        

                        <Button onClick={loginUser} label="Login" className="login-button" />
                    </form>
                </div>
            </div>
        </div>
        </>
    )

} export default Login;