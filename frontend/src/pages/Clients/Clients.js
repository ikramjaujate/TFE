import '../../assets/flags/flags.css'
import './Clients.scss'

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';

import FormNewClient from "./FormNewClient/FormNewClient";
import PaginatorTemplate from "../../shared/components/PaginatorTemplate";

import { GetClients } from "../../services/users";
import { GetCompanies } from "../../services/companies";


const Clients = () => {

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

  const [persons, setPersons] = useState([]);
  const [companies, setCompanies] = useState([]);

  const getPersons = () => {
    setLoading(true);
    GetClients().then(response => {
      setPersons(response["users"]);
    });
  }

  const getCompanies = () => {
    setLoading(true);
    GetCompanies().then(response => {
      setCompanies(response["companies"])
    })
  }

  useEffect(() => {
    persons.forEach(person => {
      person.VAT_num = person.VAT_num ? Number(person.VAT_num?.split(' ')[1]) : null
      data.push({
        id: person.idPerson,
        type: 'p',
        displayName: `${person.firstName} ${person.lastName}`,
        email: person.email,
        VAT_num: person.VAT_num,
        mobile: person.mobile,
        address: `${person.Address.street}, ${person.Address.postal_code} ${person.Address.locality}, ${person.Address.Country.nicename}`,
        iso: person.Address.Country.iso
      });
    });
    setData([...data]);
    setLoading(false);
  }, [persons])

  useEffect(() => {
    companies.forEach(company => {
      company.VAT_num = company.VAT_num ? Number(company.VAT_num?.split(' ')[1]) : null
      data.push({
        id: company.idCompany,
        type: 'c',
        displayName: company.name,
        email: company.email,
        VAT_num: company.VAT_num,
        mobile: company.mobile,
        address: `${company.Address.street}, ${company.Address.postal_code} ${company.Address.locality}, ${company.Address.Country.nicename}`,
        iso: company.Address.Country.iso
      });
    });
    setData([...data]);
    setLoading(false);
  }, [companies])

  useEffect(() => {
    // on page changes
    refresh();
  }, [])

  const refresh = () => {
    setData([])
    getPersons()
    getCompanies()
    setSelectedClient(null)
    setSelectedRow(null)
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

  const dialogFuncMap = {
    'displayBasic': setDisplayBasic
  }

  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  }


  const countryTemplate = (rowData) => {
    return (
      <React.Fragment>
        <img alt="flag" src={`assets/flags/flag_placeholder.png`} className={`flag flag-${rowData.iso}`} width={30} />
        <span className="image-text">{rowData.address}</span>
      </React.Fragment>
    )
  }

  const clientTypeTemplate = (rowData) => {
    if (rowData.type === 'p') {
      return (
        <React.Fragment>
          <i className="pi pi-user"></i>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <i className="pi pi-building"></i>
        </React.Fragment>
      );
    }
  }

  const handleClient = (client) => {
    if (client.type == 'c') {
      history.push(`/clients/company/${client.id}/detail`)
    } else {
      history.push(`/clients/person/${client.id}/detail`)
    }

  }
  const informationClientTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-info" tooltip="Open" className=" p-button-secondary" tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }}  onClick={() => handleClient(rowData)} />
        <Tooltip target=".logo" mouseTrack mouseTrackLeft={10}/>
      </React.Fragment>
    );

  }


  return (
    <>
      <div className='title'>
        <h1 >CLIENTS</h1>
      </div>
     
      <div className="grid table-demo">
        <div className="col-12">
          <FormNewClient
            refreshTable={refresh}
            sendData={selectedClient}
          />

        </div>

        <div className="col-12">
          <DataTable paginatorTemplate={PaginatorTemplate} value={data} emptyMessage="No clients found." rowHover selectionPageOnly selection={selectedRow} onSelectionChange={e => onRowSelect(e.value)} loading={loading} scrollable scrollHeight="400px" selectionMode="single" scrollDirection="both" className="mt-3" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts" rows={20} paginator>
            <Column body={clientTypeTemplate} style={{ width: '2rem' }} headerStyle={{  color: "#c9392f" }}></Column>
            <Column field="displayName" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} sortable header="Name" filter filterPlaceholder="Search by name" headerStyle={{  color: "#c9392f" }}></Column>
            <Column field="email" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} sortable header="Email" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
            <Column field="VAT_num" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '50px' }} sortable header="VAT" dataType="numeric" headerStyle={{  color: "#c9392f" }}></Column>
            <Column field="mobile" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '50px' }} sortable header="Mobile" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
            <Column field="address" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} sortable header="Address" headerStyle={{ textAlign: 'center', color: "#c9392f" }} body={countryTemplate}  ></Column>
            <Column body={informationClientTemplate} style={{ width: '5rem' }} headerStyle={{  color: "#c9392f" }}></Column>
          </DataTable>

        </div>


      </div></>
  );
}
export default Clients
