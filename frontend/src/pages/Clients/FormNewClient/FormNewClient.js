import '../../../shared/styles/form.scss';

import React, { useState, useEffect, useRef } from "react";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Panel } from 'primereact/panel';
import { SelectButton } from 'primereact/selectbutton';

import { CreateNewClient, UpdateUser } from '../../../services/users'
import { CreateNewCompany, UpdateCompany } from '../../../services/companies'
import GetCountries from "../../../services/countries";

const FormNewClient = ({ refreshTable, sendData }) => {

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
  const options = [
    { name: 'Person', value: false },
    { name: 'Company', value: true }
  ];

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



  useEffect(() => {
    if (sendData) {
     
      setNumber(sendData.mobile)
      setVta(sendData.VAT_num)
      setEmail(sendData.email)
      setAddress(sendData["Address"].street)
      setLocality(sendData["Address"].locality)
      setPostalCode(sendData["Address"].postal_code)
      setCountry(sendData["Address"]["Country"].nicename)
      if (sendData.name) {
        setFirstname(null)
        setLastname(null)
        setName(sendData.name)
        setIsCompany(true)
      } else {
        setFirstname(sendData.firstName)
        setLastname(sendData.lastName)
        setName(null)
        setIsCompany(false)
      }
    }

  }, [sendData])

  useEffect(() => {
    GetCountries().then(response => {
      setCountries(response['countries'])
    });


  }, [])

  let nameCountry = []
  for (let i in countries) {
    nameCountry.push(countries[i]["nicename"])
  }

  /*
    Tous les champs (company ou person) dans le formulaire en fonction des données 
    qu'on reçoit on met l'un ou l'autre en disable


    Par defaut c'est person
    
    
    */
  const handleClick = (e) => {
    e.preventDefault()
    

    const bodyForm = {
      'name': name,
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'vta': vta,
      'mobile': number,
      'street': address,
      'locality': locality,
      'postalCode': postalCode,
      'country': country
    }
    if (isCompany) {

      delete bodyForm.firstName
      delete bodyForm.lastName
      CreateNewCompany(bodyForm).then(response => {
        
        if (response.hasOwnProperty("companyCreated")) {
          return response
        }
        throw new Error('Something went wrong.');

      }).then(response => {
        toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'New company has been created', life: 3000 });
        clearForm()
      }).catch(error => {
        toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Company cannot be created', life: 3000 });
      })
    } else {
      delete bodyForm.name
      CreateNewClient(bodyForm).then(response => {

        if (response.hasOwnProperty("user")) {
          return response
        }
        throw new Error('Something went wrong.');

      }).then(response => {
        toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'New client has been created', life: 3000 });
        clearForm()
      }).catch(error => {
        toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Client cannot be created', life: 3000 });
      })
    }


  }
  const handleClickUpdate = (e) => {
    e.preventDefault()
    if (!email.match(/\w+[@]\w+\.\w+/)) {
      toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Invalid email address', life: 3000 });
      return;
    }

    const bodyForm = {
      'name': name,
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'vta': vta,
      'mobile': number,
      'street': address,
      'locality': locality,
      'postalCode': postalCode,
      'country': country
    }
    if (isCompany) {
      delete bodyForm.firstName
      delete bodyForm.lastName
      bodyForm["id"] = sendData.idCompany
      UpdateCompany(bodyForm).then(response => {

        if (response.hasOwnProperty("company")) {
          return response
        }
        throw new Error('Something went wrong.');

      }).then(response => {
        toast.current.show({ severity: 'info', summary: 'Success Message', detail: 'Client has been updated', life: 3000 });
        clearForm()
      }).catch(error => {
        toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Client cannot be updated', life: 3000 });
      })

    } else {
      delete bodyForm.name
      bodyForm["id"] = sendData.idPerson
      UpdateUser(bodyForm).then(response => {

        if (response.hasOwnProperty("user")) {
          return response
        }
        throw new Error('Something went wrong.');

      }).then(response => {
        toast.current.show({ severity: 'info', summary: 'Success Message', detail: 'Client has been updated', life: 3000 });
        clearForm()
      }).catch(error => {
        toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Client cannot be updated', life: 3000 });
      })
    }

  }



  return (
    <>
      <Toast ref={toast} />

      <Panel className="mt-2" header={ <span >
        <i className="pi pi-user mr-2"></i>   <i className="pi pi-building mr-2"></i>
                                    ADD CLIENT
      </span>} toggleable>
        <div className="grid p-fluid m-2">
          {!isCompany ?
            <div className="col-12 md:col-4">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span>
                <InputText value={firstName} onChange={(e) => setFirstname(e.target.value)} placeholder="First Name" />
                <span className="p-inputgroup-addon"> <i className="pi pi-flag-fill"></i></span>
              </div>
            </div> :
            <div className="col-12 md:col-8">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span>
                <InputText value={name} onChange={(e) => setName(e.target.value)} placeholder="Company's Name" />
                <span className="p-inputgroup-addon"> <i className="pi pi-flag-fill"></i></span>
              </div>
            </div>
          }
          {!isCompany ? <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon ">
                <i className="pi pi-user"></i>
              </span>
              <InputText value={lastName} onChange={(e) => setLastname(e.target.value)} placeholder="Last Name" />
              <span className="p-inputgroup-addon"> <i className="pi pi-flag-fill"></i></span>
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
              <span className="p-inputgroup-addon" > <i className="pi pi-flag-fill"></i></span>
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
              <span className="p-inputgroup-addon"> <i className="pi pi-flag-fill"></i></span>
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">

                <i className="pi pi-home"></i>


              </span>
              <InputText value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street" />
              <span className="p-inputgroup-addon"> <i className="pi pi-flag-fill"></i></span>
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-map-marker"></i>
              </span>
              <InputText value={locality} onChange={(e) => setLocality(e.target.value)} placeholder="Locality" />
              <span className="p-inputgroup-addon"> <i className="pi pi-flag-fill"></i></span>
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-map-marker"></i>
              </span>
              <InputNumber value={postalCode} mode="decimal" useGrouping={false} onValueChange={(e) => setPostalCode(e.target.value)} placeholder="Postal Code" />
              <span className="p-inputgroup-addon"> <i className="pi pi-flag-fill"></i></span>
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-map"></i>
              </span>

              <Dropdown inputId="dropdown" value={country} options={nameCountry} onChange={(e) => setCountry(e.value)} placeholder="Country" />
              <span className="p-inputgroup-addon"> <i className="pi pi-flag-fill"></i></span>
            </div>

          </div>

        </div>

        <div className='grid button-demo mx-3' >
          <div className='btn-container'>
            <Button label="Clear Form" icon="pi pi-refresh" className="p-button-info" onClick={clearForm} />
          </div>
          <div className='btn-container'>
            <SelectButton value={isCompany} options={options} className=" mr-2" onChange={(e) => setIsCompany(e.value)} optionLabel="name" />
            <Button label="Add" icon="pi pi-plus" className="p-button-success mr-2" onClick={handleClick} />
            <Button label="Update" icon="pi pi-save" className="p-button-warning " onClick={handleClickUpdate} disabled={!sendData} />

          </div>

        </div>


      </Panel>


    </>
  );
}
export default FormNewClient