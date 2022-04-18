import '../../../assets/flags/flags.css'
import './Details.css'

import React, { useState, useEffect, useRef } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { useLocation, useParams, NavLink } from "react-router-dom";
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import { GetProjectsByID, GetDocumentsByProjectId } from '../../../services/projects';
import { SendDocument } from '../../../services/documents';
import { Tooltip } from 'primereact/tooltip';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import moment from "moment";
import { UploadDocumentState } from '../../../services/documents';
import { useHistory } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import AddQuotation from '../../Quotation/Add/AddQuotation';
import FormProjectMaterial from './FormProjectMaterial/FormProjectMaterial';
import PaginatorTemplate from "../../../shared/components/PaginatorTemplate";
import { Checkbox } from 'primereact/checkbox';
import AddInvoice from '../../Invoices/Add/AddInvoice';
import { Chart } from 'primereact/chart';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faFileContract, faFileSignature, faTools, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { RiContactsBookUploadLine } from 'react-icons/ri';


const DetailsProjects = () => {

    const { id } = useParams();
    const history = useHistory();
    const projects = [

        { label: 'Projects', url: '/projects' }
    ];

    const toast = useRef(null);

    const homeProject = { icon: 'pi pi-book', url: '/projects' }
    const [data, setData] = useState([]);

    const[currentContent, setCurrentContent] = useState([])
    const [name, setName] = useState('');
    const [idProject, setIdProject] = useState('');
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [clientName, setClientName] = useState('')
    const [loading, setLoading] = useState(true)
    const [isCompany, setIsCompany] = useState(false)
    const [idPerson, setIdPerson] = useState()
    const [idCompany, setIdCompany] = useState()
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [displayResponsiveInvoice, setDisplayResponsiveInvoice] = useState(false);
    const [add, setAdd] = useState(false)
    const [position, setPosition] = useState('center');
    const [project, setProject] = useState([])
    const [isAccepted, setIsAccepted] = useState([])
    const [isPaid, setIsPaid] = useState([])
    const [documentAccepted, setDocumentAccepted] = useState(null)
    const [invoicesData, setInvoicesData] = useState([])
    const [valideQuotation, setValideQuotation] = useState(null)
    const [documentPaid, setDocumentPaid] = useState(null)

    let today = new Date( (new Date()).toISOString().split('T')[0] )
    const [timeSpent, setTimeSpent] = useState(0)
    const [timeLeft, setTimeLeft] = useState(0)


    
    const getProject = () => {

        GetProjectsByID(id).then(response => {

            setName(response["project"][0].name);
            setIdProject(response["project"][0].idProject)
            setStatus(response["project"][0].status)
           
            setStartDate(response["project"][0].start_date ? response["project"][0].start_date.split('T')[0]  : null)
            setEndDate(response["project"][0].end_date ? response["project"][0].end_date.split('T')[0]: null)
            if (response['project'][0].idCompany == null) {
                setClientName(`${response["project"][0].Person.firstName} ${response["project"][0].Person.lastName}`)
                setIsCompany(false)
                setIdPerson(response["project"][0].Person.idPerson)

            } else {
                setIsCompany(true)
                setClientName(`${response["project"][0].Company.name}`)
                setIdCompany(response["project"][0].Company.idCompany)
            }
            
            if(response["project"][0].end_date){

                const start_date =new Date(response["project"][0].start_date)
                const end_date = new Date(response["project"][0].end_date)
                
                
                const time_spent = ((today - start_date) / (1000 * 3600 * 24)).toFixed() 
                let time_left = ((end_date - today) / (1000 * 3600 * 24)).toFixed() 
    
                time_left = time_left > 0 ? time_left : 0
    
    
                setTimeSpent(time_spent);
                setTimeLeft(time_left)
            }
            
            GetDocumentsByProjectId(id).then(response => {
                
                const data = response["project"].map(project => {
                    if (project.isAccepted) {
                        setCurrentContent(project.content)
                        setDocumentAccepted(project.idDocument)
                    }
                    return {
                        idDocument: project.idDocument,
                        isAccepted: project.isAccepted
                    }
                })
                const dataInvoice = response["project"].filter(project => {
                    return project.type == 'facture' 
                }).map(project => {
                    if (project.isPaid) {
                        
                        setDocumentPaid(project.idDocument)
                    }
                    return {
                        idDocument: project.idDocument,
                        isPaid: project.isPaid
                    }
                })
                
                setIsPaid(dataInvoice)
                setIsAccepted(data)
                const invoices = []
                const quotations = []

                for (const document of response['project']) {
                    if (document.type == 'devis') {
                        if (document.isAccepted) {
                            setValideQuotation(document)
                        }
                        quotations.push(document)
                        continue
                    }
                    invoices.push(document)
                }

                setInvoicesData(invoices)
                console.log(invoices)
                setProject(quotations);

            })


        })

        setData([...data]);
        setLoading(false);

    };

    useEffect(() => {
        refresh()


    }, [])
    const handleAllProjects = () => {
        history.push(`/projects`)
    }
    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
        setAdd(true)
    }
    const refresh = () => {
        onHide('displayResponsive')
        onHide('displayResponsiveInvoice')
        setData([])
        setValideQuotation(null)
        getProject();
    }

    const getRowIsAccepted = (rowData) => {
        if (rowData && rowData.type != 'facture') {
            const rowIsAccepted = isAccepted.find(i => { return i.idDocument == rowData.idDocument })
            return rowIsAccepted ? rowIsAccepted.isAccepted : false
        }
        return false

    }
    const getRowIsPaid = (rowData) => {
        if (rowData && rowData.type == 'facture') {
            const rowIsPaid = isPaid.find(i => { return i.idDocument == rowData.idDocument })
            return rowIsPaid ? rowIsPaid.isPaid : false
        }
        return false
    }
    const setRowIsAccepted = (e, rowData) => {
        const data = [...isAccepted];

        data.forEach(element => {

            if (element.idDocument == rowData.idDocument) {
                element.isAccepted = e.checked
                if(element.isAccepted){
                    setCurrentContent(rowData.content)
                }
              
                const bodyForm = {
                    isAccepted: element.isAccepted,
                    isPaid: false
                }
                UploadDocumentState(element.idDocument, bodyForm).then(response => {

                    if (response.hasOwnProperty("project")) {
                        return response
                    }
                    throw new Error('Something went wrong.');
                }).then(response => {
                    if (response.project.status != 'Accepted') {
                        setDocumentAccepted(null)
                    }
                    
                    setStatus(response.project.status)
                    toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Quotation state has been updated', life: 3000 });
                    refresh()
                }).catch(error => {
                    toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Quotation cannot be updated', life: 3000 });
                })
            }

        });

        setIsAccepted(data);



    }
    const setRowIsPaid = (e, rowData) => {
        const data = [...isPaid];

        data.forEach(element => {

            if (element.idDocument == rowData.idDocument) {
                element.isPaid = e.checked

                const bodyForm = {
                    isPaid: element.isPaid
                }
                UploadDocumentState(element.idDocument, bodyForm).then(response => {

                    if (response.hasOwnProperty("project")) {
                        return response
                    }
                    throw new Error('Something went wrong.');
                }).then(response => {
                    if (response.project.status != 'Accepted') {
                        setDocumentPaid(null)
                    }
                    setStatus(response.project.status)
                    toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Quotation state has been updated', life: 3000 });
                    refresh()
                }).catch(error => {
                    toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Quotation cannot be updated', life: 3000 });
                })
            }

        });

        setIsPaid(data);



    }
    const statusBodyTemplateIsAccepted = (rowData) => {

        if (documentAccepted && rowData.idDocument != documentAccepted && rowData.type == "devis") {
            return <Checkbox inputId="binary" className='my-checkbox' disabled />
        }else if (rowData.type == "devis" && (['In Progress', 'Done', 'Closed', 'Canceled']).includes(status) ) {
            return <Checkbox inputId="binary" className='my-checkbox' checked={getRowIsAccepted(rowData)} disabled />
        } else if (rowData.type == "devis") {
            return <Checkbox inputId="binary" className='my-checkbox' checked={getRowIsAccepted(rowData)} onChange={e => { setRowIsAccepted(e, rowData) }} />
        }}

    const statusBodyTemplateIsPaid = (rowData) => {

        return <Checkbox inputId="invoice" className='invoice-check' checked={getRowIsPaid(rowData)} onChange={e => { setRowIsPaid(e, rowData) }} />
    }
    const dialogFuncMap = {
        'displayResponsive': setDisplayResponsive,
        'displayResponsiveInvoice': setDisplayResponsiveInvoice
    }
    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }

    }
    const statusIsPaid = (rowData) => {


        if (rowData.idPaid == 'No') {
            return <span>{rowData.idPaid}</span>;
        } else {
            return <span>{rowData.idPaid}</span>;
        }
    }
    const openPdf = (rowData) => {
        const arr = new Uint8Array(rowData.file.data);
        const blob = new Blob([arr], { type: 'application/pdf' });

        window.open(URL.createObjectURL(blob));
    }
    const send = (rowData) => {

        const body = {
            'idDocument': rowData.idDocument,
            'projectName': rowData.Project.name,
            'idPerson': rowData.Project.idPerson,
            'idCompany': rowData.Project.idCompany,
            'createdAt': moment(rowData.createdAt).utc().format('YYYY-MM-DD')
        }

        SendDocument(body).then(response => {

            if (response.hasOwnProperty("document")) {
                return response
            }
            throw new Error('Something went wrong.');
        }).then(response => {
            refresh()
            toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Document has been sent', life: 3000 });
        }).catch(error => {
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Document cannot be sent', life: 3000 });
        })
    }
    
    const informationClientTemplate = (rowData) => {

        return (
            <React.Fragment>
                <Button icon="pi pi-file-pdf" tooltip="" className="p-button-outlined p-button-info ml-2" onClick={() => openPdf(rowData)} />
                <Button icon="pi pi-envelope" tooltip="" className={` ${rowData.isEmailed ? "p-button-raised p-button-success" : " p-button-outlined p-button-warning"} ml-2 `} onClick={() => send(rowData)} />
                <Tooltip target=".logo" mouseTrack mouseTrackLeft={10} />
            </React.Fragment>
        );

    }
    const headerTemplateInfo = (options) => {
        const toggleIcon = options.collapsed ? 'pi pi-plus' : 'pi pi-minus';
        return (
            <div className='p-panel-header'>
                <span className="p-panel-title">  <FontAwesomeIcon icon={faFileSignature} className='mr-2' />QUOTATIONS</span>
                <div className='panel-header-right'>
                    <Button icon='pi pi-plus' label='Create quote' className="p-button-raised p-button-info " onClick={() => onClick('displayResponsive')} />
                    <button className={`${options.togglerClassName} ml-2`} onClick={options.onTogglerClick}>
                        <span className={toggleIcon}></span>

                    </button>
                </div>

            </div>
        )
    }

    const headerInvoicesTemplateInfo = (options) => {
        let disable = true
        if (['Done', 'In Progress', 'Closed'].includes(status)) {
            disable = false
        }

        const toggleIcon = options.collapsed ? 'pi pi-plus' : 'pi pi-minus';
        return (
            <div className='p-panel-header'>
                <span className="p-panel-title">  <FontAwesomeIcon icon={faFileContract} className='mr-2' />INVOICES</span>
                <div className='panel-header-right'>
                    <Button icon='pi pi-plus' label='Create invoice' className="p-button-raised p-button-info " onClick={() => onClick('displayResponsiveInvoice')} disabled={disable} />
                    <button className={`${options.togglerClassName} ml-2`} onClick={options.onTogglerClick}>
                        <span className={toggleIcon}></span>

                    </button>
                </div>

            </div>
        )
    }

    const headerMaterialsInfo = (options) => {
        const toggleIcon = options.collapsed ? 'pi pi-plus' : 'pi pi-minus';
        return (
            <div className='p-panel-header'>
                <span className="p-panel-title">  <FontAwesomeIcon icon={faTools} className='mr-2' /> MATERIALS</span>
                <div className='panel-header-right'>
                    <Button icon="pi pi-arrow-right" label='All materials' className="p-button-raised p-button-info " onClick={() => history.push(`/material`)} />
                    <button className={`${options.togglerClassName} ml-2`} onClick={options.onTogglerClick}>
                        <span className={toggleIcon}></span>

                    </button>
                </div>

            </div>
        )
    }
    const rowClass = (data) => {
        if (documentAccepted && data.idDocument != documentAccepted) {
            return {
                'not-update': 'non'
            }
        }
        if (documentAccepted && data.idDocument == documentAccepted) {
            return {
                'update-selected': 'yes'
            }
        }
    }
    const rowClassInvoice = (data) => {
        return;
    }
    const availableTemplate = (rowData) => {
        if (documentAccepted && rowData.idDocument != documentAccepted) {
            return <i className='pi pi-lock'></i>
        }
        return <i className='pi pi-lock-open'></i>
    }
    
    

     useEffect(() => {
setChartData({
    labels: ['T. spent', 'T. rem'],
    datasets: [
        {
            data: [timeSpent, timeLeft],
            backgroundColor: [
                "#c9392f",
                "#c3c5c7"

            ],
            hoverBackgroundColor: [
                "#ca5047",
                "#dee2e6",
            ]
        }
    ]
})
     }, [timeSpent, timeLeft])

    const [chartData, setChartData] = useState({});
    const [lightOptions] = useState({
        plugins: {
            legend: {
                display: false,
                labels: {
                    color: '#495057'
                }
            }
        }
    });
    return (
        <>
            <Toast ref={toast} baseZIndex={999999} />
            <div className='title'>
                <h1 >DETAIL</h1>
            </div>

            <div>

                <BreadCrumb model={projects} home={homeProject} />

                <div >

                    <Panel header={
                        <span >
                            <FontAwesomeIcon icon={faBookOpen} className='mr-2' /> INFORMATION </span>
                    } className='m-3 '  >
                        <div className='information-panel'>
                        <div style={ !endDate  ? {width: "100%"}: { width: '80%' } }>


                            <div className="grid p-fluid m-2">

                                <div className="col-12 md:col-4">
                                    <div className="p-inputgroup">
                                        <span className='title-span' >
                                            ID : <span className='value-client'> {idProject}</span>
                                        </span>

                                    </div>
                                </div>
                                <div className="col-12 md:col-4">
                                    <div className="p-inputgroup">
                                        <span className='title-span' >
                                            Project's name : <span className='value-client'> {name}</span>
                                        </span>

                                    </div>
                                </div>

                                <div className="col-12 md:col-4">
                                    <div className="p-inputgroup">
                                        <span className='title-span' >
                                            Start Date :  <span className='value-client'> {startDate}</span>
                                        </span>
                                    </div>
                                </div>


                                <div className="col-12 md:col-4">
                                    <div className="p-inputgroup">
                                        {isCompany ?
                                            <span className='title-span' >
                                                Client's name :  <NavLink to={`/clients/company/${idCompany}/detail`} style={{ textDecoration: 'none' }}><span className='value-client-email'>  {clientName}</span></NavLink>
                                            </span>
                                            : <span className='title-span' >
                                                Client's name :  <NavLink to={`/clients/person/${idPerson}/detail`} style={{ textDecoration: 'none' }}><span className='value-client-email'>  {clientName}</span></NavLink>
                                            </span>}

                                    </div>
                                </div>


                                <div className="col-12 md:col-4">
                                    <div className="p-inputgroup">
                                        <span className='title-span' >
                                            Status :  <span className={`customer-badge status-${status.toLowerCase()}`}>{status}</span>
                                        </span>

                                    </div>
                                </div>
                                <div className="col-12 md:col-4">
                                    <div className="p-inputgroup">
                                        <span className='title-span' >
                                            End Date : <span className='value-client'> {endDate}</span>
                                        </span>

                                    </div>
                                </div>


                            </div>
                        </div>

                        <div  style={ !endDate  ? {width: "0%"} :{width: "18%"}}>
                            <Chart type="pie" data={chartData} options={lightOptions} style={{ position: 'relative', width: '70%' }} />
                        </div>
                        </div>

                    </Panel>
                </div>
                <Panel header="MATERIALS" headerTemplate={headerMaterialsInfo} toggleable className='m-3'>
                    <FormProjectMaterial currentContent={currentContent} documentAccepted={documentAccepted} />
                </Panel>


                <Panel headerTemplate={headerTemplateInfo} toggleable className='m-3'>


                    <DataTable paginatorTemplate={PaginatorTemplate} value={project} sortField="title" sortOrder={-1} rowClassName={rowClass} emptyMessage="No documents found." selectionPageOnly loading={loading} scrollable scrollHeight="400px" selectionMode="single" scrollDirection="both" className="mt-3" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts" rows={20} paginator>
                        <Column body={availableTemplate} ></Column>
                        <Column field="title" style={{ textAlign: "center", width: '10rem', flexGrow: 1, flexBasis: '200px' }} sortable header="Title" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column field="notes" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} sortable header="Notes" headerStyle={{ color: "#c9392f" }}></Column>
                        <Column field="createdAt" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} body={(rowData) => { return moment(rowData.createAt).utc().format('YYYY-MM-DD') }} sortable header="Created At" headerStyle={{ color: "#c9392f" }}></Column>
                        <Column field="isAccepted" style={{ width: '8rem', flexGrow: 1, flexBasis: '50px' }} body={statusBodyTemplateIsAccepted} sortable header="Accepted" headerStyle={{ color: "#c9392f" }}></Column>
                        <Column body={informationClientTemplate} style={{ minWidth: '10rem' }} headerStyle={{ color: "#c9392f" }}></Column>
                    </DataTable>
                </Panel>
                <Dialog modal header={<span style={{ color: "#bc0000" }}><i className="pi pi-plus mr-2"></i> New Quotation </span>} visible={displayResponsive} onHide={() => onHide('displayResponsive')} breakpoints={{ '960px': '75vw' }} style={{ width: '90vw' }}   >
                    <AddQuotation sendId={idProject} refreshTable={refresh} />
                </Dialog>

                <Panel headerTemplate={headerInvoicesTemplateInfo} toggleable className='m-3'>
                    <DataTable className='invoice-datatable mt-3' paginatorTemplate={PaginatorTemplate} value={invoicesData} sortField="title" sortOrder={-1} emptyMessage="No documents found." selectionPageOnly loading={loading} scrollable scrollHeight="400px" selectionMode="single" scrollDirection="both" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts" rows={20} paginator>

                        <Column field="title" style={{ textAlign: "center", width: '10rem', flexGrow: 1, flexBasis: '200px' }} sortable header="Title" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column field="notes" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} sortable header="Notes" headerStyle={{ color: "#c9392f" }}></Column>
                        <Column field="createdAt" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} body={(rowData) => { return moment(rowData.createAt).utc().format('YYYY-MM-DD') }} sortable header="Created At" headerStyle={{ color: "#c9392f" }}></Column>
                        <Column field="isPaid" className='accepted' style={{ width: '8rem', flexGrow: 1, flexBasis: '50px' }} body={statusBodyTemplateIsPaid} sortable header="Paid" headerStyle={{ color: "#c9392f" }}></Column>
                        <Column body={informationClientTemplate} style={{ minWidth: '10rem' }} headerStyle={{ color: "#c9392f" }}></Column>
                    </DataTable>
                </Panel>
                <Dialog modal header={<span style={{ color: "#bc0000" }}><i className="pi pi-plus mr-2"></i> New Invoice </span>} visible={displayResponsiveInvoice} onHide={() => onHide('displayResponsiveInvoice')} breakpoints={{ '960px': '75vw' }} style={{ width: '90vw' }}   >
                    <AddInvoice sendId={idProject} documentPaid={documentPaid} sendQuotation={valideQuotation} refreshTable={refresh} />
                </Dialog>
            </div>
        </>
    )
}

export default DetailsProjects
