import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Dropdown } from 'primereact/dropdown';
import template from "../../components/Paginator/Paginator";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import GetClients from "../../services/users";
import 'bootstrap/dist/css/bootstrap.min.css';

function Clients() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [filters, setFilters] = useState({
    'firstName': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    'lastName': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
  });

  useEffect( () => {
    GetClients().then(response => {
          setLoading(false)
          setPosts(response["users"])
        });
  }, [])


  const [position, setPosition] = useState('center');


  const dialogFuncMap = {
    'displayBasic': setDisplayBasic
  }
  const actionBodyTemplate = () => {
    return <Button type="button" icon="pi pi-cog" style={{color:'white', background: 'red'}} onClick={() => onClick('displayBasic')} />;
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

  return (
    <div className="d-inline-flex p-2 bd-highlight">
      <DataTable
        value={posts}
        responsiveLayout="scroll"
        filters={filters}
        paginatorTemplate={template}
        dataKey="id"
        paginator
        rowHover
        loading={loading}
        filterDisplay="menu"
        emptyMessage="No data found."
        className="p-datatable-customers"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts"
        rows={5}
        rowsPerPageOptions={[5, 10, 25]}
        style={{marginLeft : "30%"}}
        size="small" 
      >
        <Column field="id" filterStyle={{ color: "white" }} sortable dataType="numeric" header="id" headerStyle={{ textAlign: 'center', backgroundColor: '#ff5f5f54', color: "white" }}></Column>
        <Column field="firstName" sortable header="firstName" filter filterPlaceholder="Search by name" headerStyle={{ textAlign: 'center', backgroundColor: '#ff5f5f54', color: "white" }}></Column>
        <Column field="lastName" sortable header="lastName" filter filterPlaceholder="Search by name" headerStyle={{  backgroundColor: '#ff5f5f54', color: "white" }}></Column>
        <Column field="email" sortable header="email" headerStyle={{ textAlign: 'center', backgroundColor: '#ff5f5f54', color: "white" }}></Column>
        <Column field="VAT_num" sortable header="VAT" dataType="numeric" headerStyle={{ backgroundColor: '#ff5f5f54', color: "white" }}></Column>
        <Column field="mobile" sortable header="Mobile" headerStyle={{ textAlign: 'center', backgroundColor: '#ff5f5f54', color: "white" }}></Column>
        <Column headerStyle={{ backgroundColor: '#ff5f5f54',width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />

      </DataTable>



      <Dialog header="Header" visible={displayBasic} style={{ width: '50vw', color: "red" }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
        <p className="dialog-test" style={{ color: "red" }}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </Dialog>
    </div>
  );
}

export default Clients;