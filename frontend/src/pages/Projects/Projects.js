import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { GetProjects } from "../../service/projects";
import template from "../../components/Paginator/Paginator";
import { Toolbar } from 'primereact/toolbar';
import { useHistory } from 'react-router-dom';
import { Tooltip } from 'primereact/tooltip';
import moment from "moment";
import './Project.css'
const Projects = () => {

  const history = useHistory();
  const [data, setData] = useState([]);
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

  const [projects, setProjects] = useState([]);
  const [companies, setCompanies] = useState([]);

  const getProjects = () => {
    setLoading(true);
    GetProjects().then(response => {
      setProjects(response["projects"]);
    });
  }

  useEffect(() => {
    projects.forEach(project => {
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
          displayName: `${project.Company.name}}`,
          type: 'c',
          name: `${project.name}`,
          status: project.status,
          start_date: project.start_date,
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

  useEffect(() => {
    // on page changes
    refresh();
  }, [])

  const refresh = () => {
    setData([])
    getProjects()

    setSelectedClient(null)
    setSelectedRow(null)
  }
  const statusBodyTemplate = (rowData) => {
    return <span className={`customer-badge status-${rowData.status.toLowerCase()}`}>{rowData.status}</span>;
  }



  const dialogFuncMap = {
    'displayBasic': setDisplayBasic
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
  const onRowSelect = (client) => {
    setSelectedRow(client);
    if (client.type === 'p') {
      const person = projects.find((p) => {
        return p.idPerson == client.id
      });
      setSelectedClient(person);
    } else if (client.type === 'c') {
      const company = projects.find((c) => {
        return c.idCompany == client.id
      });
      setSelectedClient(company);
    }
  }


  return (
    <>
      <h1 className='title'>Projects</h1>
      <div className="grid table-demo">


        <div className="col-12">
          <DataTable paginatorTemplate={template} value={data} emptyMessage="No projects found." rowHover selectionPageOnly selection={selectedRow} onSelectionChange={e => onRowSelect(e.value)} loading={loading} scrollable scrollHeight="400px" selectionMode="single" scrollDirection="both" className="mt-3" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts" rows={20} paginator>
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
