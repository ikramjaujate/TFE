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

const DetailsProjects = () => {

  const { id } = useParams();
  const history = useHistory();
  const projects = [
    { label: 'Projects' }
  ];
  const toast = useRef(null);

  const homeProject = { icon: 'pi pi-book', url: '/projects' }
  const [data, setData] = useState([]);


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
  const [add, setAdd] = useState(false)
  const [position, setPosition] = useState('center');
  const [project, setProject] = useState([])
  const [isAccepted, setIsAccepted] = useState([])

  const getProject = () => {

    GetProjectsByID(id).then(response => {
      
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
        
        const data = response["project"].map(project => {
          return {
            idDocument: project.idDocument,
            isAccepted: project.isAccepted
          }
        })
        
        setIsAccepted(data)

        setProject(response["project"]);
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
    setData([])
    getProject();
  }

  /*const statusBodyTemplateIsPaid = (rowData) => {
    return <span className={`customer-badge status-${rowData.isPaid.toLowerCase()}`}>{rowData.isPaid}</span>;
  }*/
  const getRowIsAccepted = (rowData) => {
    if (rowData) {
      const rowIsAccepted = isAccepted.find(i => { return i.idDocument == rowData.idDocument })
      return rowIsAccepted ? rowIsAccepted.isAccepted : false
    }
    return false

  }
  const setRowIsAccepted = (e, rowData) => {
    const data = [...isAccepted];
    
    data.forEach(element => {

      if (element.idDocument == rowData.idDocument) {
        element.isAccepted = e.checked

        const bodyForm = {
          isAccepted: element.isAccepted,
          isPaid : false
        }
        UploadDocumentState(element.idDocument, bodyForm).then(response => {
          
          if (response.hasOwnProperty("document")) {
            return response
          }
          throw new Error('Something went wrong.');
        }).then(response => {
        
          toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Quotation has been updated', life: 3000 });
        }).catch(error => {
          toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Quotation cannot be updated', life: 3000 });
        })
      }
      
    });
    
    setIsAccepted(data);

   

  }
  const statusBodyTemplateIsAccepted = (rowData) => {

    return <Checkbox inputId="binary" className='my-checkbox'  checked={getRowIsAccepted(rowData)} onChange={e => { setRowIsAccepted(e, rowData) }} />
    /*return <span className={`customer-badge status-${rowData.isAccepted.toLowerCase()}`}>{rowData.isAccepted}</span>;*/
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
      'idDocument' : rowData.idDocument,
      'projectName' : rowData.Project.name,
      'idPerson' : rowData.Project.idPerson,
      'idCompany' : rowData.Project.idCompany,
      'createdAt' : moment(rowData.createdAt).utc().format('YYYY-MM-DD')
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
        <Button icon="pi pi-envelope" tooltip="" className={` ${rowData.isEmailed ? "p-button-raised p-button-success" : " p-button-outlined p-button-warning" } ml-2 `} onClick={() => send(rowData)} />
        <Tooltip target=".logo" mouseTrack mouseTrackLeft={10} />
      </React.Fragment>
    );

  }
  const headerTemplateInfo = (options) => {
    const toggleIcon = options.collapsed ? 'pi pi-plus' : 'pi pi-minus';
    return (
      <div className='p-panel-header'>
        <span className="p-panel-title">QUOTATIONS</span>
        <div className='panel-header-right'>
          <Button icon='pi pi-plus' label='Create quote' className="p-button-raised p-button-info " onClick={() => onClick('displayResponsive')} />
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
        <span className="p-panel-title">MATERIAL</span>
        <div className='panel-header-right'>
          <Button icon="pi pi-arrow-right" label='All materials' className="p-button-raised p-button-info " onClick={() => history.push(`/material`)} />
          <button className={`${options.togglerClassName} ml-2`} onClick={options.onTogglerClick}>
            <span className={toggleIcon}></span>

          </button>
        </div>

      </div>
    )
  }
  return (
    <>
      <Toast ref={toast} />
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
        <Panel header="MATERIALS" headerTemplate={headerMaterialsInfo} toggleable className='m-3'>
        <FormProjectMaterial/>
        </Panel>


        <Panel headerTemplate={headerTemplateInfo} toggleable className='m-3'>
        

          <DataTable sortField="title" paginatorTemplate={PaginatorTemplate} value={project} emptyMessage="No documents found." rowHover selectionPageOnly loading={loading} scrollable scrollHeight="400px" selectionMode="single" scrollDirection="both" className="mt-3" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts" rows={20} paginator>
            <Column field="title" style={{ textAlign: "center", width: '10rem', flexGrow: 1, flexBasis: '200px' }} sortable header="Title" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
            <Column field="notes" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} sortable header="Notes" headerStyle={{ color: "#c9392f" }}></Column>
            <Column field="createdAt" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} body={(rowData) => {return moment(rowData.createAt).utc().format('YYYY-MM-DD')}} sortable header="Created At" headerStyle={{ color: "#c9392f" }}></Column>
            <Column field="isAccepted" style={{ width: '8rem', flexGrow: 1, flexBasis: '50px' }} body={statusBodyTemplateIsAccepted} sortable header="Accepted" headerStyle={{ color: "#c9392f" }}></Column>
            <Column body={informationClientTemplate} style={{ minWidth: '10rem' }} headerStyle={{ color: "#c9392f" }}></Column>
          </DataTable>
        </Panel>
        <Dialog modal header={<span style={{ color: "#bc0000" }}><i className="pi pi-plus mr-2"></i> New Quotation </span>} visible={displayResponsive} onHide={() => onHide('displayResponsive')} breakpoints={{ '960px': '75vw' }} style={{ width: '90vw' }}   >
          <AddQuotation sendId={idProject} refreshTable={refresh} />
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
