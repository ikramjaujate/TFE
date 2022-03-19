import '../../../shared/styles/form.scss';

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

  const nameClient = []
  for (let i in dataClients) {
    if (dataClients[i]["type"] == 'p') {

      nameClient.push(dataClients[i]["displayName"])

    } else {
      nameClient.push(dataClients[i]["displayName"])

    }

  }
  const selected = (option, props) => {
    for (let i in dataClients) {
      if (dataClients[i]['displayName'] == option) {
        setTypeSelected(dataClients[i]['type'])
        setValueClient(dataClients[i]['displayName'])
      }
    }
    

    if (option) {
      return (
        <div>
          {typeSelected == 'p' ?
            <div className="type-selected">
              <div>{valueClient}</div>
            </div>
            :
            <div>
              <div className="type-selected">
                <div>{valueClient}</div>
              </div>
            </div>}
        </div>
      );
    }
  }
  const onCreate = () => {
   
    const client = dataClients.find(client => {
      return client.displayName == valueClient
    })

    if(!client){
      toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Company cannot be created', life: 3000 });
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
      onHide("displayResponsive")
      refreshTable()
    }).catch(error => {
      toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Project cannot be created', life: 3000 });
    })
  }





  return (
    <>
      <Toast ref={toast} />
      <div className="grid p-fluid m-2">

        <div className='col-12 md:col-6'>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className={`pi ${typeSelected == "p" ? "pi-user" : "pi-building"}`}></i>
            </span>
            <Dropdown className='my-dropdown' value={valueClient} valueTemplate={selected} options={nameClient} onChange={(e) => setValueClient(e.value)} placeholder="Company's Name" />
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
      <Button label="No" icon="pi pi-times" onClick={() => onHide("displayResponsive")} className="p-button-text" />
      <Button label="Add" icon="pi pi-check" onClick={onCreate} className="p-button-add" autoFocus />


    </>
  );
}
export default NewProject