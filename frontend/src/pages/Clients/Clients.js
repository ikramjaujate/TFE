import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { GetClients, CreateNewClient } from "../../service/users";
import GetCountries from '../../service/countries';
import FormNewClient from "../../components/FormNewClient/FormNewClient";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { GetCompanies } from "../../service/companies";
import { TabView, TabPanel } from 'primereact/tabview';
import template from "../../components/Paginator/Paginator";
import { Toolbar } from 'primereact/toolbar';

const Clients = () => {

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
      console.log(person.Address.Country.idCountry)
      data.push({
        id: person.idPerson,
        type: 'p',
        displayName: `${person.firstName} ${person.lastName}`,
        email: person.email,
        VAT_num: person.VAT_num,
        mobile: person.mobile,
        address: `${person.Address.street}, ${person.Address.postal_code} ${person.Address.locality}, ${person.Address.Country.nicename}`,
        iso : person.Address.Country.iso
      });
    });
    setData([...data]);
    setLoading(false);
  }, [persons])

  useEffect(() => {
    companies.forEach(company => {
      console.log(company.VAT_num)
      company.VAT_num = company.VAT_num ? Number(company.VAT_num?.split(' ')[1]) : null
      data.push({
        id: company.idCompany,
        type: 'c',
        displayName: company.name,
        email: company.email,
        VAT_num: company.VAT_num,
        mobile: company.mobile,
        address: `${company.Address.street}, ${company.Address.postal_code} ${company.Address.locality}, ${company.Address.Country.nicename}`,
        iso : company.Address.Country.iso
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
        <img alt="flag" src={`assets/demo/images/flags/flag_placeholder.png`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${rowData.iso}`} width={30} />
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
  const informationClientTemplate = (rowData) => {
      return (
        <React.Fragment>
          <Button icon="pi pi-eye" className=" p-button-secondary" />
          
        </React.Fragment>
      );
    
  }



  return (
    <div className="grid table-demo">
      <div className="col-12">
          <FormNewClient
            refreshTable={refresh}
            sendData={selectedClient}
          />

      </div>

      <div className="col-12">
        <div className="card">
          


              <DataTable paginatorTemplate={template} value={data} emptyMessage="No clients found." rowHover selectionPageOnly selection={selectedRow} onSelectionChange={e => onRowSelect(e.value)} loading={loading} scrollable scrollHeight="400px" selectionMode="single" scrollDirection="both" className="mt-3" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts" rows={20} paginator>
                <Column body={clientTypeTemplate} style={{ width: '2rem' }}  headerStyle={{ backgroundColor: '#c9392f', color: "white" }}></Column>
                <Column field="displayName" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} sortable header="Name" filter filterPlaceholder="Search by name" headerStyle={{ backgroundColor: '#c9392f', color: "white" }}></Column>
                <Column field="email" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} sortable header="Email" headerStyle={{ textAlign: 'center', backgroundColor: '#c9392f', color: "white" }}></Column>
                <Column field="VAT_num" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '50px' }} sortable header="VAT" dataType="numeric" headerStyle={{ backgroundColor: '#c9392f', color: "white" }}></Column>
                <Column field="mobile" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '50px' }} sortable header="Mobile" headerStyle={{ textAlign: 'center', backgroundColor: '#c9392f', color: "white" }}></Column>
                <Column field="address" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} sortable header="Address" headerStyle={{ textAlign: 'center', backgroundColor: '#c9392f', color: "white" }} body={countryTemplate}  ></Column>
                <Column body={informationClientTemplate} style={{ width: '5rem' }}  headerStyle={{ backgroundColor: '#c9392f', color: "white" }}></Column>
              </DataTable>
            

        </div>
      </div>


    </div>
  );
}
export default Clients
