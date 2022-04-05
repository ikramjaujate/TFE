import './Material.scss'


import React, { useEffect, useState } from "react";

import { faBox, faWarning, faCircleExclamation, faSearch  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import PaginatorTemplate from "../../shared/components/PaginatorTemplate";
import FormMaterial from "./FormMaterial/FormMaterial";
import * as materialsService from '../../services/materials'


const Material = () => {
    const [data, setData] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState(null);

    const [loading, setLoading] = useState(true);

    const filters = {
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] }
    }

    const getMaterials = () => {
        setLoading(true);
        materialsService.GetStockStatus().then(res => {
            res['materials'].forEach(mat => {

                if (mat.Project_Material) {
                    if (['In Progress', 'Accepted'].includes(mat.Project_Material.Project.status)) {
                        console.log(mat)
                        mat['reserved'] = mat.Project_Material.quantity
                        mat['available'] = mat.quantity - mat.Project_Material.quantity

                    }else{
                        mat['reserved'] = 0
                        mat['available'] = mat.quantity 
                    }
                }else{
                    mat['reserved'] = 0
                    mat['available'] = mat.quantity 
                }
            
            })
            setData(res['materials']);
        })
    }

    useEffect(() => {
        refresh();
    }, [])

    useEffect(() => {
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
    const typeTemplate = (rowData) => {
        return <span className={`type-badge ${rowData.type == 'consumable' ? 'consumable-badge' : 'static-badge'} `}>{rowData.type.toUpperCase()}</span>;
    }
    const availableQuantityTemplate = (rowData) => {
        return <span className={`available-badge ${rowData.available < 0 ? 'notAvailable-badge' : 'available-badge'} `}>{rowData.available}</span>;
    }
    const rowClass = (rowData) => {
        if(rowData.available < 0){
            return {
                'not-available': 'no'
            }
        }
        if(rowData.available > 0){
        return {
            'yes-available': 'yes'
        }}
    }
    const availableTemplate = (rowData) => {
        if(rowData.available < 0){
            return  <FontAwesomeIcon icon={faWarning} className="warning-icon-material"/>
        }
        return <i className='pi pi-check'></i>
    }
    const quantitySpanTemplate = (rowData) => {
        
        return <span>{rowData.quantity}</span>
    }
    const reservedSpanTemplate = (rowData) => {
        
        return <span>{rowData.reserved}</span>
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
                    <DataTable className='material-datatable mt-3'   sortField="idMaterial" filters={filters} rowClassName={rowClass} globalFilterFields={['name']} paginatorTemplate={PaginatorTemplate} value={data} emptyMessage="No projects found." rowHover selectionPageOnly selection={selectedMaterial} onSelectionChange={e => setSelectedMaterial(e.value)} loading={loading} scrollable scrollHeight="400px" selectionMode="single" scrollDirection="both"  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts" rows={20} paginator>
                        <Column field="idMaterial" style={{ width: '10rem', flexGrow: 1, flexBasis: '14px' }} sortable header="Reference" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column field="name" style={{ textAlign: "center", width: '10rem', flexGrow: 1, flexBasis: '200px' }} sortable header="Label" filter filterPlaceholder="Search by name" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column body={typeTemplate} style={{ width: '10rem', flexGrow: 1, flexBasis: '14px' }} sortable header="Type" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column body={isBillableTemplate} style={{ width: '8rem' }} sortable header="Billable" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column body={quantitySpanTemplate} style={{ width: '10rem' }} sortable header="Total quantity" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column body={availableQuantityTemplate} className='availableRow'  style={{ width: '10rem' }} sortable header="Available quantity" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column body={reservedSpanTemplate} style={{ width: '10rem' }} sortable header="Reserved quantity" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column body={priceTemplate} field="price" style={{ width: '10rem', flexGrow: 1, flexBasis: '14px' }} sortable header="Price/unit" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column body={availableTemplate} ></Column>
                    </DataTable>

                </div>
            </div>
        </>
    );
};

export default Material;
