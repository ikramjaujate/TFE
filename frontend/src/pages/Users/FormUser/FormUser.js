import '../../../shared/styles/form.scss';

import React, { useState, useEffect, useRef } from "react";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Panel } from 'primereact/panel';
import { faKey, faUserGroup, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Password } from 'primereact/password';

import jwt_decode from "jwt-decode";
import * as userLoginService from '../../../services/userLogin'

const FormUser = ({ refreshTable, sendData }) => {
    const toast = useRef(null);

    const [email, setEmail] = useState('')
    const [role, setRole] = useState("Developer")
    const [password, setPassword] = useState('')
    const [filterRole, setFilterRole] = useState(['Developer', 'Administrator', 'Secretary'])
    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const [currentAccount, setCurrentAccount ] = useState(null)

    const clearForm = () => {
        setEmail('')
        setPassword('')
        setRole('Developer')
        setLastname('')
        setFirstname('')
        refreshTable()
    }

    useEffect(() => {
        
        setCurrentAccount(jwt_decode(localStorage.getItem('access_token')).user_id)
        if (sendData) {
            setEmail(sendData.email)
            setFirstname(sendData.firstName)
            setLastname(sendData.lastName)
            if(sendData.role == 'dev'){
                setRole('Developer')
            }else if(sendData.role == 'admin'){
                setRole('Administrator')
            }else if (sendData.role == 'sec'){
                setRole('Secretary')
                
            }
           
        }
       
    },[sendData])

    const onAddUser = (e) => {
        e.preventDefault()
        let roleCreate = ''
        if(role == 'Developer'){
            roleCreate = 'dev'
        }else if(role == 'Administrator'){
            roleCreate = 'admin'
        }else if (role == 'Secretary'){
            roleCreate = 'sec'
        }

        
        const bodyForm = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            role: roleCreate
        }
        userLoginService.CreateNewUser(bodyForm).then(response => {

            if (response.hasOwnProperty("newUser")) {
                return response
            }
            throw new Error('Something went wrong.');

        }).then(response => {
            toast.current.show({ severity: 'info', summary: 'Success Message', detail: 'New user has been created', life: 3000 });
            clearForm()
        }).catch(error => {
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'New user cannot be created', life: 3000 });
        })
        
    }

    const onUpdateUser = (e) => {
        e.preventDefault()
        let roleCreate = ''
        if(role == 'Developer'){
            roleCreate = 'dev'
        }else if(role == 'Administrator'){
            roleCreate = 'admin'
        }else if (role == 'Secretary'){
            roleCreate = 'sec'
        }

        let newPassword = password
        if(!password){
            newPassword = sendData.password
        }
       

        
        const bodyForm = {
            id: sendData.id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: newPassword,
            role: roleCreate
        }

        userLoginService.UpdateUserLogin(bodyForm).then(response => {

            if (response.hasOwnProperty("user")) {
                return response
            }
            throw new Error('Something went wrong.');

        }).then(response => {
            toast.current.show({ severity: 'info', summary: 'Success Message', detail: 'Project has been updated', life: 3000 });
            clearForm()
        }).catch(error => {
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Project cannot be updated', life: 3000 });
        })
    }


    const onDeleteUser = (e) => {
        
        e.preventDefault()
        let roleCreate = ''
        if(role == 'Developer'){
            roleCreate = 'dev'
        }else if(role == 'Administrator'){
            roleCreate = 'admin'
        }else if (role == 'Secretary'){
            roleCreate = 'sec'
        }       

        
        if(jwt_decode(localStorage.getItem('access_token')).role == 'admin' && ['dev'].includes(roleCreate)){
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'User cannot be deleted', life: 3000 });
            return;
        }
        
        const bodyForm = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: roleCreate
        }
       
        userLoginService.DeleteUserLogin(sendData.id,bodyForm).then(response => {

            if (response.hasOwnProperty("user")) {
                return response
            }
            throw new Error('Something went wrong.');

        }).then(response => {
            toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'User has been deleted', life: 3000 });
            clearForm()
        }).catch(error => {
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'User cannot be deleted', life: 3000 });
        })
    }

    const validateMail = (value) => {

        if(value.slice(-1) == '@'){
            value += 'masterservices.com'
        }
        setEmail(value)
    }
    return (<>
     <Toast ref={toast} baseZIndex={999999} />
        <Panel className='mt-2' header={<span >
            <FontAwesomeIcon icon={faUsers} className=" mr-2" />
            
            {!sendData ? 'ADD USER' : 'EDIT USER'}
        </span>} toggleable>
        <div className="grid p-fluid m-2">

             <div className="col-12 md:col-4">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText value={firstName} onChange={(e) => setFirstname(e.target.value)} placeholder="First Name" />
                        <span className="p-inputgroup-addon" > <i className="pi pi-flag-fill"></i></span>
                    </div>

                </div>
                

           

                <div className="col-12 md:col-4">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-envelope"></i>
                        </span>
                        <InputText value={email} onChange={(e) => validateMail(e.target.value)} placeholder="Email" />
                        <span className="p-inputgroup-addon" > <i className="pi pi-flag-fill"></i></span>
                    </div>

                </div>
                <div className="col-12 md:col-4">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                        <FontAwesomeIcon icon={faKey} />
                        </span>
                        <Password id="password" placeholder='New password' feedback={false} name="password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask  />
                        <span className="p-inputgroup-addon" > <i className="pi pi-flag-fill"></i></span>
                    </div>

                </div>
                <div className="col-12 md:col-4">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText value={lastName} onChange={(e) => setLastname(e.target.value)} placeholder="Last Name" />
                        <span className="p-inputgroup-addon" > <i className="pi pi-flag-fill"></i></span>
                    </div>

                </div>
                <div className="col-12 md:col-4"></div>
                <div className="col-12 md:col-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                            <FontAwesomeIcon icon={faUserGroup} />
                            </span>
                            <Dropdown className='my-dropdown' value={role} options={filterRole} onChange={(e) => setRole(e.value)} />
                           
                        </div>
                    </div>
            </div>
            <div className='grid button-demo mx-3' >
                    <div className='btn-container'>
                        <Button label="Clear Form" icon="pi pi-refresh" className="p-button-info" onClick={clearForm} />
                    </div>
                    <div className='btn-container'>
                       
                        <Button label="Add" icon="pi pi-plus" className="p-button-success mr-2" onClick={onAddUser} disabled={sendData} />
                        <Button label="Update" icon="pi pi-save" className="p-button-warning mr-2 " onClick={onUpdateUser} disabled={!sendData} />
                        <Button icon="pi pi-trash" className="p-button-danger " onClick={onDeleteUser} disabled={!sendData || sendData?.email == jwt_decode(localStorage.getItem('access_token')).user_id} />

                    </div>

                </div>
        </Panel>
    </>)

}

export default FormUser