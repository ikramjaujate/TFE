import './Material.scss'
import '../../assets/flags/flags.css'

import React, { useEffect, useState } from "react";

import { faBox, faWarning, faCircleExclamation, faSearch, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { useHistory, Redirect } from 'react-router-dom';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import PaginatorTemplate from "../../shared/components/PaginatorTemplate";
import FormMaterial from "./FormMaterial/FormMaterial";

import * as materialsService from '../../services/materials'
import * as project_materialsService from '../../services/project_materials'

import MaterialInformation from '../Details/Material/Details';
import Dexie from 'dexie';

const Material = () => {

    const history = useHistory();

    const [data, setData] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [loading, setLoading] = useState(true);

    const [materialData, setMaterialData] = useState({})

    const filters = {
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] }
    }

    const getMaterials = () => {
        setLoading(true);
        materialsService.GetStockStatus().then(res => {

            const materialIds = []
            const materials = []
            for (let material of res['materials']) {
               
                const matIdx = materialIds.indexOf(material.idMaterial);
                if ( matIdx > -1) {
                    
                    if (['In Progress', 'Accepted'].includes(material.Project_Material.Project.status)) {
                        materials[matIdx]['available'] -= material.Project_Material.quantity;
                        materials[matIdx]['reserved'] += material.Project_Material.quantity;
                        console.log(materials[matIdx]['available'])
                    }
                    continue;
                } 
                
                //material does not exist
                if (!material.Project_Material) {
                    
                    material['available'] = material.quantity;
                    material['reserved'] = 0;

                    materials.push(material);
                    materialIds.push(material.idMaterial)
                    continue;
                }
                
                if (['In Progress', 'Accepted'].includes(material.Project_Material.Project.status)) {
                   
                    material['available'] = material.quantity - material.Project_Material.quantity;
                    material['reserved'] = material.Project_Material.quantity;
                    console.log(material)
                } else {
                    material['available'] = material.quantity
                    material['reserved'] = 0
                    console.log(material)
                }

                materials.push(material);
                materialIds.push(material.idMaterial)
            }

            setData(materials);
        })
    }

    useEffect(() => {
        refresh();
        
    }, [])

    useEffect(() => {
        setLoading(false);
    }, [data])

    const refresh = async() => {
        
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
        if (rowData.available < 0) {
            return {
                'not-available': 'no'
            }
        }
        if (rowData.available > 0) {
            return {
                'yes-available': 'yes'
            }
        }
    }
    const availableTemplate = (rowData) => {
        if (rowData.available < 0) {
            return <FontAwesomeIcon icon={faWarning} className="warning-icon-material" />
        }
        return <i className='pi pi-check'></i>
    }
    const quantitySpanTemplate = (rowData) => {

        return <span>{rowData.quantity}</span>
    }
    const reservedSpanTemplate = (rowData) => {

        return <span>{rowData.reserved}</span>
    }

    const informationMaterial = (material) => {

        history.push({
            pathname: `/material/${material.idMaterial}/detail`,
            state: { data: material }
        })
        

    }
    const buttonInformationTemplate = (rowData) => {

        return (
            <React.Fragment>
                <Button icon="pi pi-eye" className="p-button-outlined p-button-help" onClick={() => informationMaterial(rowData)} />
            </React.Fragment>
        );
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
                    <DataTable className='material-datatable mt-3' sortOrder="1"  sortField="idMaterial" filters={filters} rowClassName={rowClass} globalFilterFields={['name']} paginatorTemplate={PaginatorTemplate} value={data} emptyMessage="No projects found." rowHover selectionPageOnly selection={selectedMaterial} onSelectionChange={e => setSelectedMaterial(e.value)} loading={loading} scrollable scrollHeight="400px" selectionMode="single" scrollDirection="both" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts" rows={20} paginator>
                    
                        <Column field="idMaterial" style={{ width: '10rem' ,  flexGrow: 1, flexBasis: '14px' }} sortable header="Reference" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column field="name" style={{ width: '10rem', flexGrow: 1, flexBasis: '14px' }} sortable header="Label" filter filterPlaceholder="Search by name" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column body={typeTemplate} style={{ width: '10rem', flexGrow: 1, flexBasis: '14px' }} sortable header="Type" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column body={isBillableTemplate} style={{ width: '10rem' , flexGrow: 1, flexBasis: '14px'  }} sortable header="Billable" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column body={quantitySpanTemplate} style={{ width: '10rem',  flexGrow: 1, flexBasis: '14px'  }} sortable header="Total quantity" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column body={availableQuantityTemplate} className='availableRow' style={{ width: '10rem',  flexGrow: 1, flexBasis: '14px'  }} sortable header="Available quantity" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column body={reservedSpanTemplate} style={{ width: '10rem',  flexGrow: 1, flexBasis: '14px'  }} sortable header="Reserved quantity" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        <Column body={priceTemplate} field="price" style={{ width: '10rem', flexGrow: 1, flexBasis: '14px' }} sortable header="Price/unit" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                        
                        <Column body={buttonInformationTemplate} ></Column>
                    </DataTable>

                  

                </div>
            </div>
        </>
    );
};

export default Material;
