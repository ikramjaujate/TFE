import '../../../assets/flags/flags.css'
import './Details.css'

import React, { useState, useEffect } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { useLocation, useParams, NavLink } from "react-router-dom";
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';

import { Fieldset } from 'primereact/fieldset';
import { GetProjectsByID, GetDocumentsByProjectId } from '../../../services/projects';
import { Tooltip } from 'primereact/tooltip';
import { FileUpload } from 'primereact/fileupload';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import moment from "moment";
import { Route, useHistory } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import AddQuotation from '../../Quotation/Add/AddQuotation';
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PaginatorTemplate from "../../../shared/components/PaginatorTemplate";


const DetailsProjects = () => {

  const { id } = useParams();
  const history = useHistory();
  const projects = [
    { label: 'Projects' }
  ];


  const homeProject = { icon: 'pi pi-book', url: '/projects' }
  const [data, setData] = useState([]);

  const [name, setName] = useState('');
  const [idProject, setIdProject] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [clientName, setClientName] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isCompany, setIsCompany] = useState(false)
  const [idPerson, setIdPerson] = useState()
  const [idCompany, setIdCompany] = useState()
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [add, setAdd] = useState(false)
  const [position, setPosition] = useState('center');
  const [project, setProject] = useState([])


  const getProject = () => {

    GetProjectsByID(id).then(response => {
      console.log(response['project'][0])
      setName(response["project"][0].name);
      setIdProject(response["project"][0].idProject)
      setStatus(response["project"][0].status)
      setStartDate(response["project"][0].start_date ? moment(response["project"].start_date).utc().format('YYYY-MM-DD') : null)
      setEndDate(response["project"][0].end_date ? moment(response["project"].end_date).utc().format('YYYY-MM-DD') : null)
      if (response['project'][0].idCompany == null) {
        setClientName(`${response["project"][0].Person.firstName} ${response["project"][0].Person.lastName}`)
        setIsCompany(false)
        setIdPerson(response["project"][0].Person.idPerson)

      } else {
        setIsCompany(true)
        setClientName(`${response["project"][0].Company.name}`)
        setIdCompany(response["project"][0].Company.idCompany)
      }

      GetDocumentsByProjectId(id).then(response => {
        for (let i in response["project"]) {
          if(response['project'][i]['isAccepted'] == true) {
            response['project'][i]['isAccepted'] = 'Yes'
          }
          else{
            response['project'][i]['isAccepted'] = 'No'
          }
        
        }
        for (let i in response["project"]) {
          if(response['project'][i]['isPaid'] == true) {
            response['project'][i]['isPaid'] = 'Yes'
          }
          else{
            response['project'][i]['isPaid'] = 'No'
          }
          response['project'][i]['type'] = response['project'][i]['type'].toUpperCase()
        }
        
        setProject(response["project"]);
      })


    })

    setData([...data]);
    setLoading(false);

  };

  useEffect(() => {
    setData([])
    // on page changes
    getProject();


  }, [])
  const handleAllProjects = () => {

    history.push(`/projects`)


  }
  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
    setAdd(true)
  }

  const statusBodyTemplateIsPaid = (rowData) => {
    return <span className={`customer-badge status-${rowData.isPaid.toLowerCase()}`}>{rowData.isPaid}</span>;
  }
  const statusBodyTemplateIsAccepted = (rowData) => {
    return <span className={`customer-badge status-${rowData.isAccepted.toLowerCase()}`}>{rowData.isAccepted}</span>;
  }
  const dialogFuncMap = {
    'displayResponsive': setDisplayResponsive
  }
  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }

  }
  const statusIsPaid = (rowData) => {
    console.log(rowData.isPaid)

    if(rowData.idPaid == 'No'){
      return <span>{rowData.idPaid}</span>;
    }else{
      return <span>{rowData.idPaid}</span>;
    }
  }
  const openPdf = (rowData) => {
    const arr = new Uint8Array(rowData.file.data);
    const blob = new Blob([arr], { type: 'application/pdf' });

    window.open(URL.createObjectURL(blob));
  }
  const informationClientTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-file-pdf" tooltip="" className="p-button-outlined p-button-info" onClick={() => openPdf(rowData)} />
        <Tooltip target=".logo" mouseTrack mouseTrackLeft={10} />
      </React.Fragment>
    );

  }

  return (
    <>
      <div className='title'>
        <h1 >DETAIL</h1>
      </div>

      <div>

        <BreadCrumb model={projects} home={homeProject} />

        <div >

          <Panel header="INFORMATION" className='m-3'  >
            <div className="grid p-fluid m-2">
              <div className="col-12 md:col-3">
                <div className="p-inputgroup">
                  <span className='title-span' >
                    ID : <span className='value-client'> {idProject}</span>
                  </span>

                </div>
              </div>
              <div className="col-12 md:col-3">
                <div className="p-inputgroup">
                  <span className='title-span' >
                    Project's name : <span className='value-client'> {name}</span>
                  </span>

                </div>
              </div>



              <div className="col-12 md:col-3">
                <div className="p-inputgroup">
                  <span className='title-span' >
                    Status :  <span className={`customer-badge status-${status.toLowerCase()}`}>{status}</span>
                  </span>

                </div>
              </div>
              <div className="col-12 md:col-3">
                <div className="p-inputgroup">
                  <span className='title-span' >
                    Start Date :  <span className='value-client'> {startDate}</span>
                  </span>
                </div>
              </div>
              <div className="col-12 md:col-3">
                <div className="p-inputgroup">
                  <span className='title-span' >
                    End Date : <span className='value-client'> {endDate}</span>
                  </span>

                </div>
              </div>
              <div className="col-12 md:col-3">
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


            </div>

          </Panel>
        </div>



        <Panel header="QUOTATIONS" toggleable className='m-3'>
          <Button icon='pi pi-plus' label='Create quote' className="p-button-raised p-button-info " onClick={() => onClick('displayResponsive')} />

          <DataTable paginatorTemplate={PaginatorTemplate} value={project} emptyMessage="No documents found." rowHover selectionPageOnly  loading={loading} scrollable scrollHeight="400px" selectionMode="single" scrollDirection="both" className="mt-3" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts" rows={20} paginator>
            <Column field="type" style={{ textAlign: "center", width: '10rem', flexGrow: 1, flexBasis: '200px' }} sortable header="File type" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
            <Column field="isPaid" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} body={statusBodyTemplateIsPaid} sortable header="Status Paid" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
            <Column field="isAccepted" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }}  body={statusBodyTemplateIsAccepted}  sortable header="Accepted"  headerStyle={{ color: "#c9392f" }}></Column>
            <Column field="notes" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} sortable header="Notes" headerStyle={{ color: "#c9392f" }}></Column>
            <Column body={informationClientTemplate} style={{ width: '5rem' }} headerStyle={{ color: "#c9392f" }}></Column>
          </DataTable>
        </Panel>
        <Dialog modal header={<span style={{ color: "#bc0000" }}><i className="pi pi-plus mr-2"></i> New Quotation </span>} visible={displayResponsive} onHide={() => onHide('displayResponsive')} breakpoints={{ '960px': '75vw' }} style={{ width: '90vw' }}   >
          <AddQuotation sendId={idProject} />
         
        </Dialog>

        <Panel header="INVOICES" toggleable className='m-3'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </Panel>
      </div>
    </>
  )
}

export default DetailsProjects
