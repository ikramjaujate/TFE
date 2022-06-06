import '../../../assets/flags/flags.css'
import './Details.css'

import React, { useState, useEffect } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { useLocation, useParams } from "react-router-dom";
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';

import { Fieldset } from 'primereact/fieldset';
import { GetClientByID, GetProjectsByClientID } from "../../../services/users";
import { GetCompanyById, GetProjectsByCompanyID } from "../../../services/companies";
import { Tooltip } from 'primereact/tooltip';
import { FileUpload } from 'primereact/fileupload';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import moment from "moment";
import { Route, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBookOpen, faFileSignature, faFileContract } from "@fortawesome/free-solid-svg-icons";
import PaginatorTemplate from "../../../shared/components/PaginatorTemplate";
import { GetProjectsByID, GetDocumentsByProjectId } from '../../../services/projects';
import { Checkbox } from 'primereact/checkbox';

const Details = (clientType) => {

    const { id } = useParams();
    const history = useHistory();
    const location = useLocation();
    const persons = [
        { label: 'Persons', url: '/clients' },
    ];
    const company = [
        { label: 'Company', url: '/clients' }
    ];
    

    const homePerson = { icon: 'pi pi-user', url: '/clients' }
    const homeCompany = { icon: 'pi pi-building', url: '/clients' }
    const [data, setData] = useState([]);
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
    const [dataPerson, setDataPerso] = useState([]);
    const [loading, setLoading] = useState(true)
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);
    const [projects, setProjects] = useState([])
    const [project, setProject] = useState([])
    const [isAccepted, setIsAccepted] = useState([])
    const [documentAccepted, setDocumentAccepted] = useState(null)
    const [factures, setFactures] = useState([])
    const onUpload = () => {

    }
    const statusBodyTemplate = (rowData) => {
        return <span className={`customer-badge status-${rowData.status.toLowerCase()}`}>{rowData.status}</span>;
    }
    const onRowSelect = (client) => {
        setSelectedRow(client);
        if (client.type === 'p') {
            const person = persons.find((p) => {
                return p.idPerson == client.id
            });
            setSelectedClient(person);
        } else if (client.type === 'c') {
            const company = companies.find((c) => {
                return c.idCompany == client.id
            });
            setSelectedClient(company);
        }
    }
    const getClients = () => {
        if (clientType === 'c') {
            GetCompanyById(id).then(response => {

                setCompanies(response["company"]);
                if(response["company"][0]['Address']['Country'].nicename == "France"){
                    response["company"][0].VAT_num = response["company"][0].VAT_num.replace(/^.{2}/g, 'FR')
                }else if(response["company"][0]['Address']['Country'].nicename == "Luxembourg"){
                    response["company"][0].VAT_num =response["company"][0].VAT_num.replace(/^.{2}/g, 'LU')
                }else if (response["company"][0]['Address']['Country'].nicename == "Netherlands"){
                    response["company"][0].VAT_num =response["company"][0].VAT_num.replace(/^.{2}/g, 'NL')
                }else if(response["company"][0]['Address']['Country'].nicename == "Belgium"){
                    response["company"][0].VAT_num =response["company"][0].VAT_num.replace(/^.{2}/g, 'BE')
                }
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
            GetProjectsByCompanyID(id).then(response => {

                if (response['company'].length !== 0) {
                    for (let i in response["company"]) {

                        response["company"][i].start_date = moment(response["company"][i].start_date).utc().format('YYYY-MM-DD')
                    }

                    response["company"][0].start_date = moment(response["company"][0].start_date).utc().format('YYYY-MM-DD')

                    setProjects(response["company"])
                }
                else {

                    setProjects(response["company"])
                }
            })
            setData([...data]);
            setLoading(false);

        } else {
            GetClientByID(id).then(response => {

                setPerson(response["user"]);
                if(response["user"][0].VAT_num && response["user"][0]['Address']['Country'].nicename == "France"){
                    response["user"][0].VAT_num = response["user"][0].VAT_num.replace(/^.{2}/g, 'FR')
                    setVta(response["user"][0].VAT_num)
                }else if( response["user"][0].VAT_num && response["user"][0]['Address']['Country'].nicename == "Luxembourg"){
                    response["user"][0].VAT_num =response["user"][0].VAT_num.replace(/^.{2}/g, 'LU')
                    setVta(response["user"][0].VAT_num)
                }else if (response["user"][0].VAT_num && response["user"][0]['Address']['Country'].nicename == "Netherlands"){
                    response["user"][0].VAT_num =response["user"][0].VAT_num.replace(/^.{2}/g, 'NL')
                    setVta(response["user"][0].VAT_num)
                }else if(response["user"][0].VAT_num && response["user"][0]['Address']['Country'].nicename == "Belgium"){
                    response["user"][0].VAT_num =response["user"][0].VAT_num.replace(/^.{2}/g, 'BE')
                    setVta(response["user"][0].VAT_num)
                }else{
                    setVta(response["user"][0].VAT_num)
                }
                
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
            GetProjectsByClientID(id).then(async(response) => {
                const projectDocuments = []
                const facturesDocument = []
                for (let i in response["user"]) {
                    response["user"][i].start_date = moment(response["user"][i].start_date).utc().format('YYYY-MM-DD')
                    if (response["user"][i].end_date) {
                        response["user"][i].end_date = moment(response["user"][i].end_date).utc().format('YYYY-MM-DD')
                    }

                    const projectName = response['user'][i].name
                    await GetDocumentsByProjectId(response["user"][i].idProject).then(response => {
                        
                       
                        for(const document of response['project'] ){
                            document['project_name'] = projectName
                            if(document.type == "devis"){
                                
                                projectDocuments.push(document)
                            }else if(document.type == "facture"){
                                facturesDocument.push(document)
                            }
                        }
                        
                        
                    })

                }
                
                setProjects(response["user"]);
                setFactures(facturesDocument)
                
                setProject(projectDocuments);
            })
            
            
            setData([...data]);
            setLoading(false);
        }

    }
    useEffect(() => {
        setData([])
        // on page changes
        getClients();


    }, [])
    const handleAllProjects = () => {

        history.push(`/projects`)


    }
    const headerTemplateInfo = (options) => {
        const toggleIcon = options.collapsed ? 'pi pi-plus' : 'pi pi-minus';
        return (
            <div className='p-panel-header'>
                <span className="p-panel-title">  <FontAwesomeIcon icon={faBook} className='mr-2' />PROJECTS</span>
                <div className='panel-header-right'>
                    <Button label="All Projects" icon="pi pi-arrow-right" className="p-button-raised p-button-info " onClick={() => handleAllProjects()} />
                    <button className={`${options.togglerClassName} ml-2`} onClick={options.onTogglerClick}>
                        <span className={toggleIcon}></span>

                    </button>
                </div>

            </div>
        )
    }
    const rowDetailsProject = (rowData) => {
        return (
            <Button icon="pi pi-info" className="p-button-secondary" onClick={() => history.push(`/projects/${rowData.idProject}/detail`)} />
        )
    }

    const headerQuotationTemplateInfo = (options) => {
        const toggleIcon = options.collapsed ? 'pi pi-plus' : 'pi pi-minus';
        return (
            <div className='p-panel-header'>
                <span className="p-panel-title">  <FontAwesomeIcon icon={faFileSignature} className='mr-2' />QUOTATIONS</span>
                <div className='panel-header-right'>
                    <Button label="All Quotations" icon="pi pi-arrow-right" className="p-button-raised p-button-info " onClick={() => history.push(`/quotations`)} />
                    <button className={`${options.togglerClassName} ml-2`} onClick={options.onTogglerClick}>
                        <span className={toggleIcon}></span>

                    </button>
                </div>

            </div>
        )
    }
    const headerInvoiceTemplateInfo = (options) => {
        const toggleIcon = options.collapsed ? 'pi pi-plus' : 'pi pi-minus';
        return (
            <div className='p-panel-header'>
                <span className="p-panel-title">  <FontAwesomeIcon icon={faFileContract} className='mr-2' />INVOICES</span>
                <div className='panel-header-right'>
                    <Button label="All Invoices" icon="pi pi-arrow-right" className="p-button-raised p-button-info " onClick={() => history.push(`/invoices`)} />
                    <button className={`${options.togglerClassName} ml-2`} onClick={options.onTogglerClick}>
                        <span className={toggleIcon}></span>

                    </button>
                </div>

            </div>
        )
    }
    const getRowIsAccepted = (rowData) => {
        if (rowData) {
            console.log(rowData.isAccepted)
            return rowData.isAccepted ? rowData.isAccepted : false
        }
        return false

    }
    const getRowIsPaid = (rowData) => {
        if (rowData) {
            console.log(rowData.isPaid)
            return rowData.isPaid ? rowData.isPaid : false
        }
        return false

    }
    const statusBodyTemplateIsAccepted = (rowData) => {
        return <Checkbox inputId="binary" className='my-checkbox-center' checked={getRowIsAccepted(rowData)} disabled />
       
    }
    const availableTemplate = (rowData) => {
        if(documentAccepted && rowData.idDocument != documentAccepted){
            return  <i className='pi pi-lock'></i>
        }
        return  <i className='pi pi-lock-open'></i>
    }
    const statusBodyTemplateIsPaid = (rowData) => {

        return <Checkbox inputId="invoice" className='invoice-check' checked={getRowIsPaid(rowData)} disabled />
    }
    return (
        <>
            <div className='title'>
                <h1 >DETAIL</h1>
            </div>

            <div>
                {clientType === 'c' ?
                    <BreadCrumb model={company} home={homeCompany} />

                    :
                    <BreadCrumb model={persons} home={homePerson} />
                }
                {clientType === 'c' ?
                    <div >

                        <Panel header={
                            <span >
                                <FontAwesomeIcon icon={faBookOpen} className='mr-2' /> INFORMATION </span>
                        } className='m-3'  >
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
                                            Country :  <img alt="flag" src={`/assets/flags/flag_placeholder.png`} className={`flag flag-${iso}`} width={30} /> <span className='value-client'> {country}</span>
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


                        <Panel header={
                            <span >
                                <FontAwesomeIcon icon={faBookOpen} className='mr-2' /> INFORMATION </span>
                        } className='m-3'  >
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
                                            Country :  <img alt="flag" src={`/assets/flags/flag_placeholder.png`} className={`flag flag-${iso}`} width={30} /> <span className='value-client'> {country}</span>
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
                <Panel headerTemplate={headerTemplateInfo} toggleable className='m-3'>
                    <DataTable paginatorTemplate={PaginatorTemplate} value={projects} emptyMessage="No projects found." rowHover selectionPageOnly selection={selectedRow} onSelectionChange={e => onRowSelect(e.value)} loading={loading} scrollable scrollHeight="400px" selectionMode="single" scrollDirection="both" className="mt-3" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts" rows={20} paginator>
                        <Column field="idProject" style={{ textAlign: "center", width: '8rem', flexGrow: 1, flexBasis: '20px' }} sortable header="Reference" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column field="name" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} sortable header="Project's Name" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} body={statusBodyTemplate} sortable header="Status" filter filterPlaceholder="Search by name" headerStyle={{ color: "#c9392f" }}></Column>
                        <Column field="start_date" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} sortable header="Start Date" filter filterPlaceholder="Search by name" headerStyle={{ color: "#c9392f" }}></Column>
                        <Column field="end_date" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '50px' }} sortable header="End Date" headerStyle={{ color: "#c9392f" }}></Column>
                        <Column className='last-col' style={{ width: '8rem', flexGrow: 1, flexBasis: '50px' }} body={rowDetailsProject} headerStyle={{ color: "#c9392f" }}></Column>
                    </DataTable>
                </Panel>
                <Panel headerTemplate={headerQuotationTemplateInfo} toggleable className='m-3'>
                    <DataTable paginatorTemplate={PaginatorTemplate} value={project} sortField="createdAt" sortOrder={-1}   emptyMessage="No documents found."  selectionPageOnly loading={loading} scrollable scrollHeight="400px" selectionMode="single" scrollDirection="both" className="mt-3" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts" rows={20} paginator>
                        <Column field="idDocument" style={{ width: '8rem', flexGrow: 1, flexBasis: '50px'}} header="Reference" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column field="title" style={{ textAlign: "center", width: '10rem', flexGrow: 1, flexBasis: '50px' }} sortable header="Quotation title" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column field="project_name" style={{ width: '12rem', flexGrow: 1,flexBasis: '200px' }} sortable header="Project's name" headerStyle={{ color: "#c9392f" }}></Column>
                        <Column field="notes" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '50px' }} sortable header="Notes" headerStyle={{ color: "#c9392f" }}></Column>
                        <Column field="createdAt" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '50px' }} body={(rowData) => { return moment(rowData.createAt).utc().format('YYYY-MM-DD') }} sortable header="Created At" headerStyle={{ color: "#c9392f" }}></Column>
                        <Column field="isAccepted" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '50px' }} className='accepted-checkbox'  body={statusBodyTemplateIsAccepted} sortable header="Accepted" headerStyle={{ color: "#c9392f" }}></Column>
                    </DataTable>
                </Panel>
                <Panel headerTemplate={headerInvoiceTemplateInfo} toggleable className='m-3'>
                <DataTable paginatorTemplate={PaginatorTemplate} value={factures} sortField="createdAt" sortOrder={-1}   emptyMessage="No documents found."  selectionPageOnly loading={loading} scrollable scrollHeight="400px" selectionMode="single" scrollDirection="both" className="mt-3" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts" rows={20} paginator>
                    <Column field="idDocument" style={{ width: '12rem', flexGrow: 1, flexBasis: '50px'}} header="Reference" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column field="title" style={{ textAlign: "center", width: '10rem', flexGrow: 1, flexBasis: '50px' }} sortable header="Invoice title" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column field="project_name" style={{ width: '12rem', flexGrow: 1,flexBasis: '200px' }} sortable header="Project's name" headerStyle={{ color: "#c9392f" }}></Column>
                        <Column field="notes" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '50px' }} sortable header="Notes" headerStyle={{ color: "#c9392f" }}></Column>
                        <Column field="createdAt" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '50px' }} body={(rowData) => { return moment(rowData.createAt).utc().format('YYYY-MM-DD') }} sortable header="Created At" headerStyle={{ color: "#c9392f" }}></Column>
                        <Column field="isPaid" className='accepted' style={{ width: '8rem', flexGrow: 1, flexBasis: '50px' }} body={statusBodyTemplateIsPaid} sortable header="Paid" headerStyle={{ color: "#c9392f" }}></Column>

                    </DataTable>
                </Panel>
            </div>
        </>
    )
}

export default Details
