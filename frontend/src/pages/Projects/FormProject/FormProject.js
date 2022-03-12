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


const FormProject = ({ refreshTable, sendData }) => {

  const toast = useRef(null);
  const [vta, setVta] = useState();
  const [email, setEmail] = useState('');
  const [firstName, setFirstname] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastname] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState()
  const [countries, setCountries] = useState([])
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCompany, setIsCompany] = useState(false);
  const [status, setStatus] = useState("Pre-Sale")
   
    

  const clearForm = () => {
    setVta()
    setEmail('')
    setFirstname('')
    setName('')
    setLastname('')
    setEmail('')
    setAddress('')
    setNumber('')
    setLocality('')
    setPostalCode()
    setCountry('')
    refreshTable()
  }
  let options = [
    { name: 'Status', value: false },
    { name: status, value: true }
  ];
    

  useEffect(() => {
    if(sendData !== null){
            
      setStatus(sendData.status)
           
    } 
       
  },[])



   

  return (
    <>
      <Toast ref={toast} />

      <Panel  className='mt-2' header={ <span >
        <i className="pi pi-user mr-2"></i>   <i className="pi pi-building mr-2"></i>
                                    EDIT PROJECT
      </span>} toggleable>
        <div className="grid p-fluid m-2">
          {!isCompany ?
            <div className="col-12 md:col-4">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span>
                <InputText value={firstName} onChange={(e) => setFirstname(e.target.value)} placeholder="First Name" />
              </div>
            </div> :
            <div className="col-12 md:col-8">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span>
                <InputText value={name} onChange={(e) => setName(e.target.value)} placeholder="Company's Name" />
              </div>
            </div>
          }
          {!isCompany ? <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText value={lastName} onChange={(e) => setLastname(e.target.value)} placeholder="Last Name" />
            </div>
          </div> :
            <div>
            </div>}

          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-envelope"></i>
              </span>
              <InputText value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            </div>

          </div>
          <div className="col-12 md:col-4">

            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">VAT</span>
              <InputNumber value={vta} onValueChange={(e) => setVta(e.target.value)} showButtons mode="decimal" useGrouping={false} placeholder="VAT number" />
            </div>

          </div>
          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-phone"></i>
              </span>
              <InputText value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Phone Number" />
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">

                <i className="pi pi-home"></i>


              </span>
              <InputText value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street" />
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-map-marker"></i>
              </span>
              <InputText value={locality} onChange={(e) => setLocality(e.target.value)} placeholder="Locality" />
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-map-marker"></i>
              </span>
              <InputNumber value={postalCode} mode="decimal" useGrouping={false} onValueChange={(e) => setPostalCode(e.target.value)} placeholder="Postal Code" />
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-map"></i>
              </span>

              <Dropdown inputId="dropdown" value={country}  onChange={(e) => setCountry(e.value)} placeholder="Country" />

            </div>

          </div>

        </div>

        <div className='grid button-demo-flex mx-1' >
          <div className='btn-container-flex'>
            <Button label="Clear Form" icon="pi pi-refresh" className="p-button-info" onClick={clearForm} />
          </div>
          <div className='btn-container-flex'>
            <SelectButton value={isCompany} options={options} className=" mr-2" onChange={(e) => setIsCompany(e.value)} optionLabel="name" disabled/>
            <Button label="Update" icon="pi pi-save" className="p-button-warning " onClick={() => console.log('test')} disabled={!sendData} />
                       

          </div>

        </div>


      </Panel>


    </>
  );
}
export default FormProject