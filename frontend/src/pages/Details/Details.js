import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { useLocation, useParams } from "react-router-dom";
import { Panel } from 'primereact/panel';
import './Details.css'
import { Fieldset } from 'primereact/fieldset';
import { GetClientByID } from "../../service/users";
import { GetCompanyById } from "../../service/companies";
import { Tooltip } from 'primereact/tooltip';
import { FileUpload } from 'primereact/fileupload';
const Details = (clientType) => {

    const { id } = useParams();
    const persons = [
        { label: 'Persons' }
    ];
    const company = [
        { label: 'Company' }
    ];
    const homePerson = { icon: 'pi pi-user', url: '/clients' }
    const homeCompany = { icon: 'pi pi-building', url: '/clients' }

    const [person, setPerson] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [vta, setVta] = useState('');
    const [email, setEmail] = useState('');
    const [locality, setLocality] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [street, setStreet] = useState('');
    const [idPerson, setIdPerson] = useState();
    const [idCompany, setIdCompany] = useState();
    const [iso, setIso] = useState('');
    const [dataPerson, setDataPerso ] = useState([]);
    const [loading, setLoading] = useState(true)

    const onUpload = () => {
        
    }
    const getClients = () => {
        if(clientType === 'c'){
            GetCompanyById(id).then(response => {
                console.log(response["company"][0].VAT_num)
                setCompanies(response["company"]);
                setVta(response["company"][0].VAT_num)
                setName(response["company"][0].name)
                setEmail(response["company"][0].email)
                setMobile(response["company"][0].mobile)
                setCountry(response["company"][0]['Address']['Country'].nicename)
                setIdCompany(response["company"][0].idCompany)
                setPostalCode(response["company"][0]['Address'].postal_code)
                setStreet(response["company"][0]['Address'].street)
                setLocality(response["company"][0]['Address'].locality)
                setIso(response["company"][0]['Address']['Country'].iso)
            })

        }else{
            GetClientByID(id).then(response => {
                console.log(response["user"][0])
                setPerson(response["user"]);
                setVta(response["user"][0].VAT_num)
                setFirstName(response["user"][0].firstName)
                setLastName(response["user"][0].lastName)
                setEmail(response["user"][0].email)
                setMobile(response["user"][0].mobile)
                setCountry(response["user"][0]['Address']['Country'].nicename)
                setIdPerson(response["user"][0].idPerson)
                setPostalCode(response["user"][0]['Address'].postal_code)
                setStreet(response["user"][0]['Address'].street)
                setLocality(response["user"][0]['Address'].locality)
                setIso(response["user"][0]['Address']['Country'].iso)
            })
        }
;
    }
      useEffect(() => {
        // on page changes
        getClients();
        
        
      }, [])


    return (
        <div>
            {clientType === 'c' ?
                <BreadCrumb model={company} home={homeCompany} />

                :
                <BreadCrumb model={persons} home={homePerson} />
            }
            {clientType === 'c' ?
                <div >

                    <Panel header="INFORMATION" className='m-3'  >
                        <div className="grid p-fluid m-2">
                            <div className="col-12 md:col-3">
                                <div className="p-inputgroup">
                                    <span className='title-span' >
                                        ID : <span className='value-client'> {idCompany}</span>
                                    </span>

                                </div>
                            </div>
                            <div className="col-12 md:col-3">
                                <div className="p-inputgroup">
                                    <span className='title-span' >
                                        Company's name : <span className='value-client'> {name}</span>
                                    </span>

                                </div>
                            </div>


                            
                            <div className="col-12 md:col-3">
                                <div className="p-inputgroup">
                                    <span className='title-span' >
                                        Locality :  <span className='value-client'> {locality}</span>
                                    </span>

                                </div>
                            </div>
                            <div className="col-12 md:col-3">
                                <div className="p-inputgroup">
                                    <span className='title-span' >
                                        Street :  <span className='value-client'> {street}</span>
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 md:col-3">
                                <div className="p-inputgroup">
                                    <span className='title-span' >
                                        Country :  <img alt="flag" src={`/assets/demo/images/flags/flag_placeholder.png`}  className={`flag flag-${iso}`} width={30} /> <span className='value-client'> {country}</span>
                                    </span>

                                </div>
                            </div>
                            <div className="col-12 md:col-3">
                                <div className="p-inputgroup">
                                    <span className='title-span' >
                                        Postal Code :  <span className='value-client'> {postalCode}</span>
                                    </span>

                                </div>
                            </div>
                            <div className="col-12 md:col-3">
                                <div className="p-inputgroup">
                                    <span className='title-span' >
                                        Mobile phone :  <span className='value-client'> {mobile}</span>
                                    </span>

                                </div>
                            </div>
                            <div className="col-12 md:col-3">
                                <div className="p-inputgroup">
                                    <span className='title-span' >
                                        Email address :  <span className='value-client-email'> {email}</span>
                                    </span>

                                </div>
                            </div>
                            <div className="col-12 md:col-3">
                                <div className="p-inputgroup">
                                    <span className='title-span' >
                                        VAT :  <span className='value-client'> {vta}</span>
                                    </span>

                                </div>
                            </div>
                        </div>

                    </Panel>
                </div>

                :
                
                <div >


                    <Panel header="INFORMATION" className='m-3'  >
                        <div className="grid p-fluid m-2">
                            <div className="col-12 md:col-3">
                                <div className="p-inputgroup">
                                    <span className='title-span' >
                                        ID : <span className='value-client'>{idPerson} </span>
                                    </span>

                                </div>
                            </div>
                            <div className="col-12 md:col-3">
                                <div className="p-inputgroup">
                                    <span className='title-span' >
                                        First Name : <span className='value-client'> {firstName}</span>
                                    </span>

                                </div>
                            </div>
                            <div className="col-12 md:col-3">
                                <div className="p-inputgroup">
                                    <span className='title-span' >
                                        Last Name : <span className='value-client'> {lastName}</span>
                                    </span>

                                </div>
                            </div>

                            <div className="col-12 md:col-3">
                                <div className="p-inputgroup">
                                    <span className='title-span' >
                                        Locality :  <span className='value-client'> {locality}</span>
                                    </span>

                                </div>
                            </div>
                            <div className="col-12 md:col-3">
                                <div className="p-inputgroup">
                                    <span className='title-span' >
                                        Street :  <span className='value-client'> {street}</span>
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 md:col-3">
                                <div className="p-inputgroup">
                                    <span className='title-span' >
                                        Country :  <img alt="flag" src={`/assets/demo/images/flags/flag_placeholder.png`}  className={`flag flag-${iso}`} width={30} /> <span className='value-client'> {country}</span>
                                    </span>

                                </div>
                            </div>
                            <div className="col-12 md:col-3">
                                <div className="p-inputgroup">
                                    <span className='title-span' >
                                        Postal Code :  <span className='value-client'> {postalCode}</span>
                                    </span>

                                </div>
                            </div>
                            <div className="col-12 md:col-3">
                                <div className="p-inputgroup">
                                    <span className='title-span' >
                                        Mobile phone :  <span className='value-client'> {mobile}</span>
                                    </span>

                                </div>
                            </div>
                            <div className="col-12 md:col-3">
                                <div className="p-inputgroup">
                                    <span className='title-span' >
                                        Email address :  <span className='value-client-email'> {email}</span>
                                    </span>

                                </div>
                            </div>
                            <div className="col-12 md:col-3">
                                <div className="p-inputgroup">
                                    <span className='title-span' >
                                        VAT :  <span className='value-client'> {vta}</span>
                                    </span>

                                </div>
                            </div>
                        </div>
                    </Panel>
                    
                    
                </div>
            
            }
            <Panel header="DEVIS" toggleable className='m-3'>
            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />
            <FileUpload name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000}
                    emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />

            </Panel>
            <Panel header="FACTURES" toggleable className='m-3'>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </Panel>
        </div>
    )
}

export default Details
