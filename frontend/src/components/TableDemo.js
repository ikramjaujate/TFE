import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import {GetClients, CreateNewClient} from "../service/users";
import {GetCountries} from "../service/countries";

const TableDemo = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [filters, setFilters] = useState({
      'firstName': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
      'lastName': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
    });
    const [text, setText] = useState('');
    const getClients = () => {
      GetClients().then(response => {
  
      setLoading(false)
      setPosts(response["users"])
  
    });}
  
    useEffect( () => {
      getClients()
    }, [])
  
  
  
    const [position, setPosition] = useState('center');
  
  
    const dialogFuncMap = {
      'displayBasic': setDisplayBasic
    }
    const actionBodyTemplate = () => {
      return <Button type="button" icon="pi pi-pencil" style={{color:'#c9392f', background: 'white', borderColor: "#c9392f"}} onClick={() => onClick('displayBasic')} />;
    }
  
  
  
    const onClick = (name, position) => {
      dialogFuncMap[`${name}`](true);
  
      if (position) {
        setPosition(position);
      }
    }
  
    const onHide = (name) => {
      dialogFuncMap[`${name}`](false);
    }
  
    const renderFooter = (name) => {
      return (
        <div>
          <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
          <Button label="Yes" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
        </div>
      );
    }
    const countryBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <img alt="flag" src="assets/demo/images/flags/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} width={30} />
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }} className="image-text">{rowData.country.name}</span>
            </React.Fragment>
        );
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
    }






    return (
        <div className="grid table-demo">
           

            <div className="col-12">
                <div className="card">

                    <h5>Frozen Columns</h5>

                    <DataTable value={posts} loading={loading} scrollable scrollHeight="400px" scrollDirection="both" className="mt-3">

                        <Column field="idPerson" style={{ minWidth: '12rem' ,flexGrow: 1, flexBasis: '200px' }} filterStyle={{ color: "white" }} sortable dataType="numeric" header="id" headerStyle={{ textAlign: 'center', backgroundColor: 'rgb(216 21 21 / 56%)', color: "white" }}></Column>
                        <Column field="firstName" style={{ minWidth: '12rem' ,flexGrow: 1, flexBasis: '200px' }} sortable header="firstName" filter filterPlaceholder="Search by name" headerStyle={{ textAlign: 'center', backgroundColor: 'rgb(216 21 21 / 56%)', color: "white" }}></Column>
                        <Column field="lastName" style={{ minWidth: '12rem' ,flexGrow: 1, flexBasis: '200px' }} sortable header="lastName" filter filterPlaceholder="Search by name" headerStyle={{  backgroundColor: 'rgb(216 21 21 / 56%)', color: "white" }}></Column>
                        <Column field="email" style={{ minWidth: '12rem' ,flexGrow: 1, flexBasis: '200px' }} sortable header="email" headerStyle={{ textAlign: 'center', backgroundColor: 'rgb(216 21 21 / 56%)', color: "white" }}></Column>
                        <Column field="VAT_num" style={{ minWidth: '12rem' ,flexGrow: 1, flexBasis: '200px' }} sortable header="VAT" dataType="numeric" headerStyle={{ backgroundColor: 'rgb(216 21 21 / 56%)', color: "white" }}></Column>
                        <Column field="mobile" style={{ minWidth: '12rem' ,flexGrow: 1, flexBasis: '200px' }} sortable header="Mobile" headerStyle={{ textAlign: 'center', backgroundColor: 'rgb(216 21 21 / 56%)', color: "white" }}></Column>
                        <Column field="Address.street" style={{ minWidth: '12rem' ,flexGrow: 1, flexBasis: '200px' }} sortable header="Street" headerStyle={{ textAlign: 'center', backgroundColor: 'rgb(216 21 21 / 56%)', color: "white" }}></Column>
                        <Column field="Address.Country.nicename" body={countryTemplate} style={{ minWidth: '12rem' ,flexGrow: 1, flexBasis: '200px' }} sortable header="Country"  headerStyle={{ textAlign: 'center', backgroundColor: 'rgb(216 21 21 / 56%)', color: "white" }}></Column>
                       
                        
                    </DataTable>
                </div>
            </div>

            
        </div>
    );
}
export default TableDemo
