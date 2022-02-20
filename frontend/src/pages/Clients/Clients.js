import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Dropdown } from 'primereact/dropdown';
import template from "../../components/Paginator/Paginator";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

function Clients() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [filters, setFilters] = useState({
    'body': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    'title': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
});

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setLoading(false)
        setPosts(res.data)
      });
  }, []);
  


  const actionBodyTemplate = () => {
    return <Button type="button" icon="pi pi-cog" onClick={() => onclick('displayBasic')}></Button>;
}

 

  return (
    <div>
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
        rowsPerPageOptions={[5,10,25]}
        style={{marginLeft: "200px"}}
      >
        <Column field="userId" filterStyle={{color : "white"}} sortable dataType="numeric" header="userId" headerStyle={{  textAlign: 'center', backgroundColor: '#ff5f5f54', color: "white" }}></Column>
        <Column field="id" sortable dataType="numeric" header="id" headerStyle={{  textAlign: 'center', backgroundColor: '#ff5f5f54', color: "white" }}></Column>
        <Column field="title" sortable filter filterPlaceholder="Search by name" header="title" headerStyle={{  textAlign: 'center', backgroundColor: '#ff5f5f54', color: "white" }} ></Column>
        <Column field="body" sortable filter filterPlaceholder="Search by name" header="body" headerStyle={{  textAlign: 'center', backgroundColor: '#ff5f5f54', color: "white" }} ></Column>
        <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
        
       
      </DataTable>
      </div>
  );
}

export default Clients;