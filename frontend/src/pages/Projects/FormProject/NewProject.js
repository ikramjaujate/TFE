import '../../../shared/styles/form.scss';
import '../Project.scss'
import React, { useState, useEffect, useRef } from "react";
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { CreateProject } from '../../../services/projects';

const NewProject = ({ refreshTable, dataClients, onHide }) => {

    const toast = useRef(null);
    const [name, setName] = useState('')
    const [valueClient, setValueClient] = useState([])
    const [typeSelected, setTypeSelected] = useState('p')
    const [nameClient, setNameClient] = useState([])
    
    
    useEffect(() => {
        const nameClientTest = []
        
        for (let i in dataClients) {
            nameClientTest.push({"displayName": dataClients[i]["displayName"]})
        }

        
        setNameClient(nameClientTest)
        
    }, [dataClients])
    
    const selected = (option, props) => {
        
        for (let i in dataClients) {
            if (dataClients[i]['displayName'] == option?.displayName) {
                
                setTypeSelected(dataClients[i]['type'])
               
            }
        }
    

        if (option) {
            return (
                <div>
                    {typeSelected == 'p' ?
                        <div className="type-selected">
                            <div>{valueClient.displayName}</div>
                        </div>
                        :
                        <div>
                            <div className="type-selected">
                                <div>{valueClient.displayName}</div>
                            </div>
                        </div>}
                </div>
            );
        }
    }
    const onCreate = () => {
        
        const client = dataClients.find(client => {
            return client.displayName == valueClient.displayName
        })
       

        if(!client){
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Company cannot be created', sticky: true });
            return
        }
   

        const bodyForm = {
            'name': name,
            'status' : 'Pre-Sale',
            'start_date' : new Date()
        }
        if(client.type == 'p'){
            bodyForm["idPerson"] = client.id
        }else{
            bodyForm["idCompany"] = client.id
        }
    

        CreateProject(bodyForm).then(response => {
            if (response.hasOwnProperty("project")) {
                return response
            }
            throw new Error('Something went wrong.');

        }).then(response => {
            toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'New project has been created', life: 3000 });
            onHide()
            refreshTable()
        }).catch(error => {
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Project cannot be created', life: 3000 });
        })
    }





    return (
        <>
            <Toast style={{marginTop: '60px'}} ref={toast} baseZIndex={999999} />
            <div className="grid p-fluid m-2">

                <div className='col-12 md:col-6'>
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className={`pi ${typeSelected == "p" ? "pi-user" : "pi-building"}`}></i>
                        </span>
                        <Dropdown className='my-dropdown' valueTemplate={selected}  value={valueClient} options={nameClient} onChange={(e) => {setValueClient(e.value); console.log(e)}} placeholder="Client's Name" filter optionLabel="displayName"/>
                    </div>

                </div>

                <div className='col-12 md:col-6'>
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-book"></i>
                        </span>
                        <InputText value={name} onChange={(e) => setName(e.target.value)} placeholder="Project's name" />
                    </div>
                </div>
            </div>
            <Button label="No" icon="pi pi-times" onClick={() => onHide()} className="p-button-text" />
            <Button label="Add" icon="pi pi-plus" onClick={onCreate} className="p-button p-component p-button-success" autoFocus />


        </>
    );
}
export default NewProject