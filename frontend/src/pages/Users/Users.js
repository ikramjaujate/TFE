import './Users.css'

import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import jwt_decode from "jwt-decode";
import FormUser from './FormUser/FormUser';

import * as userLoginService from '../../services/userLogin'

const Users = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    
    const getUsersLogin = () => {
        setLoading(true);
        userLoginService.GetUsers().then(response => {
            console.log(response['usersAccount'])
            setData(response["usersAccount"]);
           
        })
    }
    const onRowSelect = (user) => {
            setSelectedRow(user);
            setSelectedUser(user)
        }
    useEffect(() => {
        refresh()
    }, [])

    const refresh = () => {
        getUsersLogin()
        setLoading(false)
        setData([])
        setSelectedUser(null)
        setSelectedRow(null)
    }
    const roleTemplate = (rowData) => {
        if(rowData.role == 'dev'){
            return <span>Developer</span>
        }else if (rowData.role == 'admin'){
            return <span>Administrator</span>
        }else{
            return <span>Secretary</span>
        }
    }
    const rowClass = (data) => {
        if(data && data.email == jwt_decode(localStorage.getItem('access_token')).user_id){
            return {
                'current-account': 'non'
            }
        }
        if(data && data.email != jwt_decode(localStorage.getItem('access_token')).user_id){
        return {
            'not-current-account': 'yes'
        }}
    }
    return (
        <>
            <div className='title'>
                <h1 >USERS</h1>
            </div>
            
            <div className="grid table-demo">
            <div className="col-12">
                    <FormUser
                        refreshTable={refresh}
                        sendData={selectedUser}
                    />

                </div>

                <div className="col-12">
                    <DataTable  sortOrder="1"  sortField='id' rowClassName={rowClass} value={data} rowHover selectionPageOnly selection={selectedRow} onSelectionChange={e => onRowSelect(e.value)}  emptyMessage="No projects found."   loading={loading} scrollable scrollHeight="400px" selectionMode="single" scrollDirection="both" className="mt-3" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts" rows={20} paginator>
                        <Column field="id" style={{ width: '8rem'}} sortable header="Reference" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column field="firstName" style={{ width: '10rem', flexGrow: 1, flexBasis: '14px' }} sortable header="First Name" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column field="lastName" style={{ width: '10rem', flexGrow: 1, flexBasis: '14px' }} sortable header="Last Name" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column field="email" style={{ width: '10rem', flexGrow: 1, flexBasis: '200px' }} sortable header="Email" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column body={roleTemplate} style={{ width: '10rem', flexGrow: 1, flexBasis: '30px' }} sortable header="Role" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                    </DataTable>

                </div>


            </div>
        </>
    )
}
export default Users