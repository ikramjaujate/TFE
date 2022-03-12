import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { GetProjects } from "../../services/projects";
import { GetClients } from "../../services/users";
import { GetCompanies } from "../../services/companies";
import { Toolbar } from 'primereact/toolbar';
import { useHistory } from 'react-router-dom';
import { Tooltip } from 'primereact/tooltip';
import moment from "moment";
import './Project.scss'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';

import PaginatorTemplate from "../../shared/components/PaginatorTemplate";
import FormProject from './FormProject/FormProject';
import NewProject from './FormProject/NewProject';

const Projects = () => {

  const history = useHistory();
  const [isCompany, setIsCompany] = useState(false);
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [data, setData] = useState([]);
  const [personsDropdown, setPersonsDropdown] = useState([]);
  const [companiesDropdown, setCompaniesDropdown] = useState([]);
  const [dataClients, setDataClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [position, setPosition] = useState('center');
  const [filters, setFilters] = useState({
    'firstName': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    'lastName': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const[typeSelected, setTypeSelected] = useState('p')
  const [projects, setProjects] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [valueClient, setValueClient] = useState([])

  const [add, setAdd] = useState(false)
  const getProjects = () => {
    setLoading(true);
    GetProjects().then(response => {
      setProjects(response["projects"]);
    });
  }
  const getClients = () => {
    GetClients().then(response => {
      setPersonsDropdown(response["users"]);

    });
  }

  useEffect(() => {
    projects.forEach(project => {
      console.log(project)
      if (project.idCompany == null) {
        data.push({
          id: project.idProject,
          idPerson: project.Person.idPerson,
          idCompany: null,
          displayName: `${project.Person.firstName}, ${project.Person.lastName}`,
          type: 'p',
          name: `${project.name}`,
          status: project.status,
          start_date: moment(project.start_date).utc().format('YYYY-MM-DD'),
          end_date: project.end_date,
          mobile: project.Person.mobile,
          VAT_num: project.Person.VAT_num
        })
      }
      else {
        
        data.push({
          id: project.idProject,
          idPerson: null,
          idCompany: project.Company.idCompany,
          displayName: `${project.Company.name}`,
          type: 'c',
          name: `${project.name}`,
          status: project.status,
          start_date: moment(project.start_date).utc().format('YYYY-MM-DD'),
          end_date: project.end_date,
          mobile: project.Company.mobile,
          VAT_num: project.Company.VAT_num
        })
      }
    });
    setData([...data]);
    console.log(data)
    setLoading(false);
  }, [projects])

  const getCompanies = () => {
    setLoading(true);
    GetCompanies().then(response => {
      setCompaniesDropdown(response["companies"])
    })
  }

  useEffect(() => {
    personsDropdown.forEach(person => {
      dataClients.push({
        id: person.idPerson,
        type: 'p',
        displayName: `${person.firstName} ${person.lastName}`
      });
    });
    setDataClients([...dataClients]);
    setLoading(false);
  }, [personsDropdown])

  useEffect(() => {
    companiesDropdown.forEach(company => {

      dataClients.push({
        id: company.idCompany,
        type: 'c',
        displayName: company.name
      });
    });
    setDataClients([...dataClients]);
    setLoading(false);
  }, [companiesDropdown])



  useEffect(() => {
    // on page changes
    refresh();
  }, [])

  const refresh = () => {
    setData([])
    getProjects()
    setSelectedClient(null)
    setSelectedRow(null)
    getCompanies()
    getClients()
  }
  const statusBodyTemplate = (rowData) => {
    return <span className={`customer-badge status-${rowData.status.toLowerCase()}`}>{rowData.status}</span>;
  }
  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
    setAdd(true)
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

  const informationClientTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-eye" tooltip="Open" className=" p-button-secondary" tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }} />
        <Tooltip target=".logo" mouseTrack mouseTrackLeft={10} />
      </React.Fragment>
    );

  }
  const onRowSelect = (project) => {
    setSelectedRow(project);
    if(project){
      setSelectedClient(project);
    }
   

  }
  const options = [
    { name: 'Person', value: false },
    { name: 'Company', value: true }
  ];
  

  return (
    <>
    <div className='title'>
    <h1 >PROJECTS</h1>
    <Button className='p-button-secondary-project' label="New Project" icon="pi pi-plus-circle" onClick={() => onClick('displayResponsive')} />
    </div>
      
      <div className='btn-container-add-project'>
       
      </div>
      <Dialog   header={ <span style={{color: "#bc0000"}}><i className="pi pi-plus mr-2"></i> New project </span>} visible={displayResponsive} onHide={() => onHide('displayResponsive')} breakpoints={{ '960px': '75vw' }} style={{ width: '50%' }} >
        {/*<div className="col-12 md:col-8">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
              
           
  
          </div>
        </div>
         <Dropdown  inputId="dropdown" value={valueClient} valueTemplate={selected} options={nameClient} onChange={(e) => setValueClient(e.value)}  placeholder="Company's Name" />
         <SelectButton value={isCompany} className="ml-6" options={options} onChange={(e) => setIsCompany(e.value)} optionLabel="name" />*/}
        <NewProject dataClients={dataClients} onHide={onHide} refreshTable={refresh}/>
        
        
      </Dialog>
    
      <div className="grid table-demo">


        <div className="col-12">
          <DataTable paginatorTemplate={PaginatorTemplate} value={data} emptyMessage="No projects found." rowHover selectionPageOnly selection={selectedRow} onSelectionChange={e => onRowSelect(e.value)} loading={loading} scrollable scrollHeight="400px" selectionMode="single" scrollDirection="both" className="mt-3" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts" rows={20} paginator>
            <Column field="id" style={{ textAlign: "center", width: '8rem', flexGrow: 1, flexBasis: '20px' }} sortable header="Reference" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
            <Column field="name" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} sortable header="Project's Name" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
            <Column style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} body={statusBodyTemplate} sortable header="Status" filter filterPlaceholder="Search by name" headerStyle={{ color: "#c9392f" }}></Column>
            <Column field="start_date" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} sortable header="Start Date" filter filterPlaceholder="Search by name" headerStyle={{ color: "#c9392f" }}></Column>

            <Column body={informationClientTemplate} style={{ width: '5rem' }} headerStyle={{ color: "#c9392f" }}></Column>
          </DataTable>

        </div>


      </div>
    </>
  );
}
export default Projects
