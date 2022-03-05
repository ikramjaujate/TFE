import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './FormNewClient.css';

import React, { useState, useEffect, useRef } from "react";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import GetCountries from "../../service/countries";
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import { Toast } from 'primereact/toast';
import { GetClients, CreateNewClient, UpdateUser } from '../../service/users'
import Clients from '../../pages/Clients/Clients';
import { TabView, TabPanel } from 'primereact/tabview';



const FormNewClient = ({ refreshTable, sendData }) => {

    const toast = useRef(null);
    const [vta, setVta] = useState();
    const [email, setEmail] = useState('');
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [number, setNumber] = useState('');
    const [address, setAddress] = useState('');
    const [locality, setLocality] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState()
    const [countries, setCountries] = useState([])
    const [activeIndex, setActiveIndex] = useState(0);

    const [value, setValue] = useState(false)

    useEffect(() => {
        if (sendData) {
            setFirstname(sendData.firstName)
            setLastname(sendData.lastName)
            setNumber(sendData.mobile)
            setVta(sendData.VAT_num)
            setEmail(sendData.email)
            setAddress(sendData["Address"].street)
            setLocality(sendData["Address"].locality)
            setPostalCode(sendData["Address"].postal_code)
            setCountry(sendData["Address"]["Country"].nicename)
            setValue(true)
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
    const handleClick = (e) => {
        e.preventDefault()

        const bodyForm = {
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
        CreateNewClient(bodyForm).then(response => {

            if (response.hasOwnProperty("user")) {
                return response
            }
            throw new Error('Something went wrong.');

        }).then(response => {
            toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'New client has been created', life: 3000 });
            refreshTable()
        }).catch(error => {
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Client cannot be created', life: 3000 });
        })

    }
    const handleClickUpdate = (e) => {
        e.preventDefault()

        const bodyForm = {
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
        UpdateUser(bodyForm).then(response => {

            if (response.hasOwnProperty("user")) {
                return response
            }
            throw new Error('Something went wrong.');

        }).then(response => {
            toast.current.show({ severity: 'info', summary: 'Success Message', detail: 'Client has been updated', life: 3000 });
            refreshTable()
        }).catch(error => {
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Client cannot be updated', life: 3000 });
        })

    }



    return (
        <>
            <Toast ref={toast} />

            <div className='m-1'>
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header="ADD CLIENT">
                        <Fieldset legend="New Client"  >
                            <div className="grid p-fluid m-2">
                                <div className="col-12 md:col-4">
                                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-user"></i>
                                        </span>
                                        <InputText value={firstName} onChange={(e) => setFirstname(e.target.value)} placeholder="First Name" />
                                    </div>
                                </div>
                                <div className="col-14 md:col-4">
                                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-user"></i>
                                        </span>
                                        <InputText value={lastName} onChange={(e) => setLastname(e.target.value)} placeholder="Last Name" />
                                    </div>
                                </div>

                                <div className="col-12 md:col-4">
                                {value == false ?
                                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-envelope"></i>
                                        </span>
                                        <InputText value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                                    </div>
                                    : 
                                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-envelope"></i>
                                        </span>
                                        <InputText value={email} placeholder="Email" disabled />
                                    </div>
                                    }
                                </div>
                                <div className="col-12 md:col-4">
                                    {value == false ?
                                        <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">VAT</span>
                                            <InputNumber value={vta} onValueChange={(e) => setVta(e.target.value)} showButtons mode="decimal" useGrouping={false} placeholder="VAT number" />
                                        </div>
                                        : <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">VAT</span>
                                            <InputNumber value={vta} showButtons mode="decimal" useGrouping={false} placeholder="VAT number" disabled />
                                        </div>}
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
                                <div className="col-12 md:col-3">
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

                                        <Dropdown inputId="dropdown" value={country} options={nameCountry} onChange={(e) => setCountry(e.value)} placeholder="Country" />

                                    </div>

                                </div>

                            </div>
                            <div class="grid button-demo ">
                                <div class="col">
                                </div>
                                <div class="col button-submit-position">
                                    {firstName !== '' && lastName !== '' && email !== '' && number !== '' && address !== '' && locality !== '' && country !== '' && postalCode !== undefined && value == false ?
                                        (<Button label="Add" icon="pi pi-plus" className="p-button-success" onClick={handleClick} />)
                                        :
                                        <div>
                                            {firstName !== '' && lastName !== '' && email !== '' && number !== '' && address !== '' && locality !== '' && country !== '' && postalCode !== undefined && value == true ?
                                                <div>
                                                    <Button label="Update" icon="pi pi-pencil" className="p-button-warning" onClick={handleClickUpdate} />
                                                </div>
                                                :
                                                <div>
                                                    <Button label="Add" icon="pi pi-plus" disabled /></div>
                                            }

                                        </div>
                                    }
                                </div>
                            </div>


                        </Fieldset>
                    </TabPanel>
                    <TabPanel header="ADD COMPANY">
                        <Fieldset legend="New Company"  >
                            <div className="grid p-fluid m-2">
                                <div className="col-12 md:col-4">
                                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-user"></i>
                                        </span>
                                        <InputText value={firstName} onChange={(e) => setFirstname(e.target.value)} placeholder="First Name" />
                                    </div>
                                </div>
                                <div className="col-14 md:col-4">
                                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-user"></i>
                                        </span>
                                        <InputText value={lastName} onChange={(e) => setLastname(e.target.value)} placeholder="Last Name" />
                                    </div>
                                </div>

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
                                        <InputNumber value={vta} onValueChange={(e) => setVta(e.target.value)} showButtons min={0} max={100} placeholder="VAT number" />
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
                                <div className="col-12 md:col-3">
                                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-map-marker"></i>
                                        </span>
                                        <InputNumber value={postalCode} onValueChange={(e) => setPostalCode(e.target.value)} placeholder="Postal Code" />
                                    </div>
                                </div>
                                <div className="col-12 md:col-4">
                                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-map"></i>
                                        </span>

                                        <Dropdown inputId="dropdown" value={country} options={nameCountry} onChange={(e) => setCountry(e.value)} placeholder="Country" />

                                    </div>

                                </div>

                            </div>
                            <div class="grid button-demo ">
                                <div class="col">
                                </div>
                                <div class="col button-submit-position">
                                    <Button label="Add" icon="pi pi-plus" className="p-button-success" onClick={handleClick} />
                                </div>
                            </div>


                        </Fieldset>
                    </TabPanel>
                </TabView>
            </div>

        </>
    );
}
export default FormNewClient