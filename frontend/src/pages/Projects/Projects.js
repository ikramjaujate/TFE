import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { GetProjects } from "../../services/projects";
import { GetClients } from "../../services/users";
import { GetCompanies } from "../../services/companies";
import { useHistory } from 'react-router-dom';
import { Tooltip } from 'primereact/tooltip';
import moment from "moment";
import './Project.scss'
import { Dialog } from 'primereact/dialog';

import PaginatorTemplate from "../../shared/components/PaginatorTemplate";
import FormProject from './FormProject/FormProject';
import NewProject from './FormProject/NewProject';

const Projects = () => {

    const history = useHistory();

    const [data, setData] = useState([]);
    const [personsDropdown, setPersonsDropdown] = useState([]);
    const [companiesDropdown, setCompaniesDropdown] = useState([]);
    const [dataClients, setDataClients] = useState([]);

    const [displayDialog, setDisplayDialog] = useState(false);
    const [loading, setLoading] = useState(true);

    const filters ={
        'displayName': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] }
    }
  
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);
    const [projects, setProjects] = useState([]);


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
     
            if (project.idCompany == null) {
                if(project.end_date != null){
                    project.end_date = moment(project.end_date).utc().format('YYYY-MM-DD')
                }
                data.push({
                    id: project.idProject,
                    idPerson: project.Person.idPerson,
                    idCompany: null,
                    displayName: `${project.Person.firstName} ${project.Person.lastName}`,
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
       
                if(project.end_date != null){
                    project.end_date = moment(project.end_date).utc().format('YYYY-MM-DD')
                }
                data.push({
                    id: project.idProject,
                    idPerson: null,
                    idCompany: project.Company.idCompany,
                    displayName: `${project.Company.name}`,
                    type: 'c',
                    name: `${project.name}`,
                    status: project.status,
                    start_date: moment(project.start_date).utc().format('YYYY-MM-DD'),
                    end_date: project.end_date ,
                    mobile: project.Company.mobile,
                    VAT_num: project.Company.VAT_num
                })
            }
        });
        setData([...data]);

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
  
    const handleProject = (project) => {

        history.push(`/projects/${project.id}/detail`)


    }

    const informationClientTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-info" tooltip="Open" className=" p-button-secondary" tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }} onClick={() => handleProject(rowData)} />
                <Tooltip target=".logo" mouseTrack mouseTrackLeft={10} />
            </React.Fragment>
        );

    }
    const onRowSelect = (project) => {
        
        
        setSelectedRow(project);



        if (project) {
            setSelectedClient(project);
        }


    }

    return (
        <>
            <div className='title'>
                <h1 >PROJECTS</h1>
                <Button className='p-button-secondary-project' label="New Project" icon="pi pi-plus-circle" onClick={() => setDisplayDialog(true)} />
            </div>

            <Dialog header={<span style={{ color: "#bc0000" }}><i className="pi pi-plus mr-2"></i> New project </span>} visible={displayDialog} onHide={() => setDisplayDialog(false)} breakpoints={{ '960px': '75vw' }} style={{ width: '50%' }} >
                <NewProject dataClients={dataClients} onHide={() => setDisplayDialog(false)} refreshTable={refresh} />
            </Dialog>
            <FormProject sendData={selectedClient} refreshTable={refresh}/>

            <div className="grid table-demo">

                <div className="col-12">
                    <DataTable sortOrder="-1" sortField="end_date" filters={filters} globalFilterFields={['displayName']} paginatorTemplate={PaginatorTemplate} value={data} emptyMessage="No projects found." rowHover selectionPageOnly selection={selectedRow} onSelectionChange={e => onRowSelect(e.value)} loading={loading} scrollable scrollHeight="400px" selectionMode="single" scrollDirection="both" className="mt-3" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts" rows={20} paginator>
                        <Column field="id" style={{  width: '8rem', flexGrow: 1, flexBasis: '14px' }} sortable header="Reference" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column field="name" style={{ width: '10rem', flexGrow: 1, flexBasis: '200px' }} sortable header="Project's Name" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column field="displayName" style={{ textAlign: "center",width: '10rem', flexGrow: 1, flexBasis: '200px' }} sortable header="Client's Name" filter filterPlaceholder="Search by name" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column style={{ width: '10rem', flexGrow: 1, flexBasis: '200px' }} body={statusBodyTemplate} sortable header="Status"  headerStyle={{ color: "#c9392f" }}></Column>
                        <Column field="start_date" style={{ width: '8rem', flexGrow: 1, flexBasis: '50px' }} sortable header="Start Date"  headerStyle={{ color: "#c9392f" }}></Column>
                        <Column field="end_date" style={{ width: '8rem', flexGrow: 1, flexBasis: '50px' }} sortable header="End Date"  headerStyle={{ color: "#c9392f" }}></Column>
                        <Column body={informationClientTemplate} style={{ width: '5rem' }} headerStyle={{ color: "#c9392f" }}></Column>
                    </DataTable>

                </div>


            </div>
        </>
    );
}
export default Projects
