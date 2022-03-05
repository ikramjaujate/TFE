import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import {GetClients, CreateNewClient} from "../../service/users";
import GetCountries from '../../service/countries';
import FormNewClient from "../../components/FormNewClient/FormNewClient";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import {GetCompanies} from "../../service/companies";
import { TabView, TabPanel } from 'primereact/tabview';
import template from "../../components/Paginator/Paginator";

const Clients = () => {

    const [posts, setPosts] = useState([]);
    const [postes, setPostes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [filters, setFilters] = useState({
      'firstName': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
      'lastName': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
    });
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedClient, setSelectedClient] = useState(null);
    
    const getCompanies = () => {
      GetCompanies().then(response => {
        setPostes(response["companies"])
    
      })
    }

    const getClients = () => {
      GetClients().then(response => {
  
      setLoading(false)
      setPosts(response["users"])
      
  
    })
    ;}
  
    useEffect( () => {
      getClients()
      getCompanies()

    }, [])

    
  
    const [position, setPosition] = useState('center');
  
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
      //console.log(rowData.Address.Country)
      return (
          <React.Fragment>
              <img alt="flag" src={`assets/demo/images/flags/flag_placeholder.png`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${rowData.Address.Country.iso}`} width={30} />
              <span className="image-text">{rowData.Address.Country.nicename}</span>
          </React.Fragment>
      )
  }

    const refresh = () => {
      getClients()
      getCompanies()
      
    }

    const onChangeSelectedClient = (id) => {
        console.log(id)
    }


    return (
        <div className="grid table-demo">
            <div className="col-12">
                <div className="card">
                <FormNewClient 
                  refreshTable={refresh}
                  sendData={selectedClient}
                />
                </div>
                </div>

            <div className="col-12">
                <div className="card">
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header="CLIENTS">
                    <DataTable paginatorTemplate={template} value={posts} emptyMessage="No clients found." rowHover selectionPageOnly selection={selectedClient} onSelectionChange={e => setSelectedClient(e.value)} loading={loading} scrollable scrollHeight="400px" selectionMode="single" scrollDirection="both" className="mt-3" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts" rows={5} paginator>
                        <Column field="firstName" style={{ minWidth: '12rem' ,flexGrow: 1, flexBasis: '200px' }} sortable header="First Name" filter filterPlaceholder="Search by name" headerStyle={{ textAlign: 'center', backgroundColor: '#c9392f', color: "white" }}></Column>
                        <Column field="lastName" style={{ minWidth: '12rem' ,flexGrow: 1, flexBasis: '200px' }} sortable header="Last Name" filter filterPlaceholder="Search by name" headerStyle={{  backgroundColor: '#c9392f', color: "white" }}></Column>
                        <Column field="email" style={{ minWidth: '12rem' ,flexGrow: 1, flexBasis: '200px' }} sortable header="Email" headerStyle={{ textAlign: 'center', backgroundColor: '#c9392f', color: "white" }}></Column>
                        <Column field="VAT_num" style={{ minWidth: '12rem' ,flexGrow: 1, flexBasis: '200px' }} sortable header="VAT" dataType="numeric" headerStyle={{ backgroundColor: '#c9392f', color: "white" }}></Column>
                        <Column field="mobile" style={{ minWidth: '12rem' ,flexGrow: 1, flexBasis: '200px' }} sortable header="Mobile" headerStyle={{ textAlign: 'center', backgroundColor: '#c9392f', color: "white" }}></Column>
                        <Column field="Address.street" style={{ minWidth: '12rem' ,flexGrow: 1, flexBasis: '200px' }} sortable header="Street" headerStyle={{ textAlign: 'center', backgroundColor: '#c9392f', color: "white" }}></Column>
                        <Column field="Address.Country.nicename" body={countryTemplate} style={{ width: '6rem' ,flexGrow: 1, flexBasis: '200px' }} sortable header="Country"  headerStyle={{ textAlign: 'center', backgroundColor: '#c9392f', color: "white" }}></Column>
                        
               
                    </DataTable>
                    </TabPanel>
                    <TabPanel header="COMPANIES">
                    <DataTable value={postes} loading={loading} scrollable scrollHeight="400px" scrollDirection="both" className="mt-3">
                        <Column field="name" style={{ minWidth: '12rem' ,flexGrow: 1, flexBasis: '200px' }} sortable header="Company's Name" filter filterPlaceholder="Search by name" headerStyle={{ textAlign: 'center', backgroundColor: '#c9392f', color: "white" }}></Column>
                        <Column field="email" style={{ minWidth: '12rem' ,flexGrow: 1, flexBasis: '200px' }} sortable header="email" headerStyle={{ textAlign: 'center', backgroundColor: '#c9392f', color: "white" }}></Column>
                        <Column field="VAT_num" style={{ minWidth: '12rem' ,flexGrow: 1, flexBasis: '200px' }} sortable header="VAT" dataType="numeric" headerStyle={{ backgroundColor: '#c9392f', color: "white" }}></Column>
                        <Column field="mobile" style={{ minWidth: '12rem' ,flexGrow: 1, flexBasis: '200px' }} sortable header="Mobile" headerStyle={{ textAlign: 'center', backgroundColor: '#c9392f', color: "white" }}></Column>
                        <Column field="Address.street" style={{ minWidth: '12rem' ,flexGrow: 1, flexBasis: '200px' }} sortable header="Street" headerStyle={{ textAlign: 'center', backgroundColor: '#c9392f', color: "white" }}></Column>
                        <Column field="Address.Country.nicename" body={countryTemplate} style={{ minWidth: '12rem' ,flexGrow: 1, flexBasis: '200px' }} sortable header="Country"  headerStyle={{ textAlign: 'center', backgroundColor: '#c9392f', color: "white" }}></Column>
                       
                        
                    </DataTable>

                    </TabPanel>
                </TabView>
                </div>
            </div>

            
        </div>
    );
}
export default Clients
