import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import PaginatorTemplate from "../../shared/components/PaginatorTemplate";

import moment from "moment";

import * as documentService from '../../services/documents'

const Quotation = () => {
    const [data, setData] = useState([]);
    const filters = {
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] }
    }
    const [loading, setLoading] = useState(true)
    const getQuotations = () => {
        setLoading(true);
        documentService.GetAllQuotations().then(response => {
            setData(response["documents"]);
            console.log(response['documents'])
        });
        setLoading(false)


    }
    const refresh = () => {
        getQuotations()
    }
    useEffect(() => {
        refresh()
    }, [])

    const statusBodyTemplate = (rowData) => {
        return <span className={`customer-badge status-${rowData.Project.status.toLowerCase()}`}>{rowData.Project.status}</span>;
    }
    return (
        <>
            <div className='title'>
                <h1>QUOTATION</h1>
            </div>

            <div className="grid table-demo">

                <div className="col-12">
                    <DataTable sortOrder="1" sortField='idDocument' filters={filters} globalFilterFields={['title']} paginatorTemplate={PaginatorTemplate} value={data} emptyMessage="No projects found." rowHover selectionPageOnly loading={loading} scrollable scrollHeight="400px" selectionMode="single" scrollDirection="both" className="mt-3" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts" rows={20} paginator>
                        <Column field="idDocument" style={{ minWidth: '10rem'}} sortable header="Reference" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column field="title" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} sortable header="Document's title" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column field="Project.name" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} sortable header="Project's name" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} body={statusBodyTemplate} sortable header="Status"  headerStyle={{ color: "#c9392f" }}></Column>
                        <Column field="notes" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} sortable header="Notes" headerStyle={{ color: "#c9392f" }}></Column>
                        <Column field="createdAt" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} body={(rowData) => { return moment(rowData.createAt).utc().format('YYYY-MM-DD') }} sortable header="Created" headerStyle={{ color: "#c9392f" }}></Column>
                        
                    </DataTable>

                </div>


            </div>

        </>
    )
}
export default Quotation