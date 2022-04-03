import './Material.scss'


import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import PaginatorTemplate from "../../shared/components/PaginatorTemplate";
import FormMaterial from "./FormMaterial/FormMaterial";
import * as materialsService from '../../services/materials'

import { faTools, faInfo, faHourglassStart, faHourglassEnd } from "@fortawesome/free-solid-svg-icons";


const Material = () => {
    const [data, setData] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState(null);

    const [displayDialog, setDisplayDialog] = useState(false);
    const [loading, setLoading] = useState(true);

    const filters = {
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] }
    }

    const getMaterials = () => {
        setLoading(true);
        materialsService.GetMaterials().then(res => {
            setData(res['materials']);
        })
    }

    useEffect(() => {
        refresh();
    }, [])

    useEffect(() => {
        console.log(data)
        setLoading(false);
    }, [data])

    const refresh = () => {
        setData([]);
        getMaterials();
        setSelectedMaterial(null);
    }

    const isBillableTemplate = (rowData) => {
        return <span className={`isBillable-badge ${rowData.isBillable ? 'yes-badge' : 'no-badge'} `}>{rowData.isBillable ? 'Yes' : 'No'}</span>;
    }
    const priceTemplate = (rowData) => {
        return <span >{rowData.price.toFixed(2).replace('.', ',')} € </span>;
    }
    return (
        <>
            <div className="title">
                <h1>MATERIALS</h1>

            </div>

            <FormMaterial
                refreshTable={refresh}
                sendData={selectedMaterial}
            />
            <div className="grid table-demo">
                <div className="col-12">
                    <DataTable sortOrder="-1" sortField="end_date" filters={filters} globalFilterFields={['name']} paginatorTemplate={PaginatorTemplate} value={data} emptyMessage="No projects found." rowHover selectionPageOnly selection={selectedMaterial} onSelectionChange={e => setSelectedMaterial(e.value)} loading={loading} scrollable scrollHeight="400px" selectionMode="single" scrollDirection="both" className="mt-3" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts" rows={20} paginator>
                        <Column field="idMaterial" style={{ width: '8rem', flexGrow: 1, flexBasis: '14px' }} sortable header="Reference" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column field="name" style={{ textAlign: "center", width: '10rem', flexGrow: 1, flexBasis: '200px' }} sortable header="Label" filter filterPlaceholder="Search by name" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column field="type" style={{ width: '8rem', flexGrow: 1, flexBasis: '14px' }} sortable header="Type" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column body={isBillableTemplate} style={{ width: '8rem', flexGrow: 1, flexBasis: '14px' }} sortable header="Billable" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column field="quantity" style={{ width: '8rem', flexGrow: 1, flexBasis: '14px' }} sortable header="Stock Q." headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column body={priceTemplate} field="price" style={{ width: '8rem', flexGrow: 1, flexBasis: '14px' }} sortable header="Price/unit" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                    </DataTable>

                </div>
            </div>
        </>
    );
};

export default Material;
