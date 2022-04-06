import React, { useState, useEffect , useRef} from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import PaginatorTemplate from "../../shared/components/PaginatorTemplate";
import { Toast } from 'primereact/toast';

import moment from "moment";

import * as documentService from '../../services/documents'

const Quotation = () => {
    const [data, setData] = useState([]);
    const toast = useRef(null);
    const filters = {
        'Project.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] }
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
    const send = (rowData) => {

        const body = {
            'idDocument': rowData.idDocument,
            'projectName': rowData.Project.name,
            'idPerson': rowData.Project.idPerson,
            'idCompany': rowData.Project.idCompany,
            'createdAt': moment(rowData.createdAt).utc().format('YYYY-MM-DD')
        }

        documentService.SendDocument(body).then(response => {

            if (response.hasOwnProperty("document")) {
                return response
            }
            throw new Error('Something went wrong.');
        }).then(response => {
            refresh()
            toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Document has been sent', life: 3000 });
        }).catch(error => {
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Document cannot be sent', life: 3000 });
        })
    }
    const openPdf = (rowData) => {
        const arr = new Uint8Array(rowData.file.data);
        const blob = new Blob([arr], { type: 'application/pdf' });

        window.open(URL.createObjectURL(blob));
    }
    const informationQuotationTemplate = (rowData) => {

        return (
            <React.Fragment>
                <Button icon="pi pi-file-pdf"  className="p-button-outlined p-button-info ml-2" onClick={() => openPdf(rowData)} />
                <Button icon="pi pi-envelope"  className={` ${rowData.isEmailed ? "p-button-raised p-button-success" : " p-button-outlined p-button-warning"} ml-2 `} onClick={() => send(rowData)} />
               
            </React.Fragment>
        );

    }

    return (
        <>
            <div className='title'>
                <h1>QUOTATION</h1>
            </div>

            <div className="grid table-demo">

                <div className="col-12">
                    <DataTable sortOrder="1" sortField='idDocument' filters={filters} globalFilterFields={['Project.name']} paginatorTemplate={PaginatorTemplate} value={data} emptyMessage="No quotations found." rowHover selectionPageOnly loading={loading} scrollable scrollHeight="400px" selectionMode="single" scrollDirection="both" className="mt-3" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts" rows={20} paginator>
                        <Column field="idDocument" style={{ width: '10rem'}} sortable header="Reference" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column field="title" style={{ width: '12rem', flexGrow: 1, flexBasis: '14px' }} sortable header="Document's title" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column field="Project.name" style={{ width: '12rem', flexGrow: 1, flexBasis: '14px' }} filterPlaceholder="Search by name"  filter sortable header="Project's name" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column style={{ width: '12rem', flexGrow: 1, flexBasis: '14px' }} body={statusBodyTemplate} sortable header="Status"  headerStyle={{ color: "#c9392f" }}></Column>
                        <Column field="notes" style={{ width: '12rem', flexGrow: 1, flexBasis: '14px' }} sortable header="Notes" headerStyle={{ color: "#c9392f" }}></Column>
                        <Column field="createdAt" style={{ width: '12rem', flexGrow: 1, flexBasis: '14px' }} body={(rowData) => { return moment(rowData.createAt).utc().format('YYYY-MM-DD') }} sortable header="Date" headerStyle={{ color: "#c9392f" }}></Column>
                        <Column body={informationQuotationTemplate} style={{ width: '8rem' , flexGrow: 1, flexBasis: '14px'}} headerStyle={{ color: "#c9392f" }}></Column>
                    </DataTable>

                </div>


            </div>

        </>
    )
}
export default Quotation