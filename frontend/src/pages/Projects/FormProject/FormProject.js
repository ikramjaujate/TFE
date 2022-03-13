import '../../../shared/styles/form.scss';

import React, { useState, useEffect, useRef } from "react";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import GetCountries from "../../../services/countries";
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import { Toast } from 'primereact/toast';
import { GetClients, CreateNewClient, UpdateUser } from '../../../services/users'
import { CreateNewCompany, UpdateCompany } from '../../../services/companies'
import Clients from '../../../pages/Clients/Clients';
import { TabView, TabPanel } from 'primereact/tabview';
import { Panel } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
import { SelectButton } from 'primereact/selectbutton';
import { RiContactsBookLine } from 'react-icons/ri';
import { Calendar } from 'primereact/calendar';
import { max } from 'moment';
import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UpdateProject } from '../../../services/projects';

const FormProject = ({ refreshTable, sendData }) => {

  const toast = useRef(null);
  const [vta, setVta] = useState();
  const [email, setEmail] = useState('');
  const [clientName, setClientName] = useState('');
  const [name, setName] = useState('');
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [country, setCountry] = useState('');
  const [isCompany, setIsCompany] = useState(false);
  const [status, setStatus] = useState("Pre-Sale")
  const [idProject, setIdProject] = useState(null)
  let today = new Date();
  let maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))


  const clearForm = () => {
    setEmail('')
    setName('')
    setStatus('')
    refreshTable()
  }
  const options = [
    { name: 'Person', value: false },
    { name: 'Company', value: true }
  ];
  useEffect(() => {
    
    if (sendData) {
      let displayName = (sendData.displayName).replace(/,/g, '');
      console.log(displayName)
      console.log(sendData)
      setName(sendData.name)
      setIdProject(sendData.id)
      setClientName(displayName)
      setStartDate(new Date(sendData.start_date))
      setStatus(sendData.status)
      
      setEndDate(sendData.end_date ? new Date(sendData.end_date) : null) 
      if(sendData.type == 'p'){
        setIsCompany(false)
      }else{
        setIsCompany(true)
      }
    }

  }, [sendData])
  console.log(sendData)
 
  const handleClickUpdate = (e) => {
    e.preventDefault()

    const bodyForm = {
      'id': sendData.id,
      'name': name,
      'status': status,
      'start_date' : new Date(start_date) ,
      'end_date': end_date? new Date(end_date): null
    }

    UpdateProject(bodyForm).then(response => {

      if (response.hasOwnProperty("project")) {
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

  


   

  return (
    <>
      <Toast ref={toast} />

      <Panel  className='mt-2' header={ <span >
        <i className="pi pi-book mr-2"></i>
                                    EDIT PROJECT
      </span>} toggleable>
        <div className="grid p-fluid m-2">

          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-book"></i>
              </span>
              <InputText value={name} onChange={(e) => setName(e.target.value)} placeholder="Project's name" />
            </div>
          </div>
          {isCompany ?<div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">

                <i className="pi pi-building"></i>


              </span>
              <InputText value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client's name" disabled />
            </div>
          </div>: <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">

                <i className="pi pi-user"></i>


              </span>
              <InputText value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client's name" disabled />
            </div>
          </div>}
          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i class="fa-solid fa-hourglass-start"></i>
              </span>
              <Calendar className='select-day' id="icon" value={start_date} onChange={(e) => setStartDate(e.value)} showIcon  maxDate={maxDate}  />
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i class="fas fa-info"></i>
              </span>
              <InputText value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Start Date" disabled />
            </div>
          </div>
          <div className="col-12 md:col-4">
          </div>
          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i class="fa-solid fa-hourglass-end"></i>
              </span>
              <Calendar className='select-day' id="icon" value={end_date} onChange={(e) => setEndDate(e.value)} showIcon minDate={today} maxDate={maxDate}  />
            </div>
          </div>


        </div>

        <div className='grid button-demo-flex mx-1' >
          <div className='btn-container-flex'>
            <Button label="Clear Form" icon="pi pi-refresh" className="p-button-info" onClick={clearForm} />
          </div>
          <div className='btn-container-flex'>
            <SelectButton value={isCompany} options={options} className=" mr-2" onChange={(e) => setIsCompany(e.value)} optionLabel="name" disabled/>
            <Button label="Update" icon="pi pi-save" className="p-button-warning " onClick={handleClickUpdate} disabled={!sendData} />
                       

          </div>

        </div>


      </Panel>


    </>
  );
}
export default FormProject