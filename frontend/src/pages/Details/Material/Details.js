import './Details.css'

import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams } from "react-router-dom";
import moment from "moment";

import { faBookOpen, faBook, faWarning, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Tooltip } from 'primereact/tooltip';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { DataTable } from 'primereact/datatable';
import { useHistory } from 'react-router-dom';

import * as materialsService from '../../../services/materials'
import * as project_materialsService from '../../../services/project_materials'


const MaterialInformation = () => {
    const { id } = useParams();

    const toast = useRef(null);
    const location = useLocation();
    const history = useHistory();
    const materials = [
        { label: 'Materials', url: '/material' },
        { label: location.state.data?.name }
    ];
    const homeMaterials = { icon: 'pi pi-box', url: '/material' }
    const [loading, setLoading] = useState(true)

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0.0)
    const [qty, setQty] = useState(0)
    const [type, setType] = useState('')
    const [available, setAvailable] = useState(0)
    const [reserved, setReserved] = useState(0)

    const [projectsMaterials, setProjectsMaterials] = useState([])
    const [data, setData] = useState([]);

    const [changes, setChanges] = useState([])

    const getProjectsMaterials = () => {
        setLoading(true)
        project_materialsService.GetProjectByMaterialId(id).then(res => {
            if (res.projectMaterial) {
                setProjectsMaterials(res.projectMaterial)
            } else {
                setProjectsMaterials([])
            }
        })

        setLoading(false);
    }

    const getMaterialsHistory = () => {
        
        materialsService.GetMaterialChanges(id).then(res => {
            

                setChanges(res)

            //console.log(res)
            //setChanges(res.changes)
        })
        
    }

    const refresh = () => {
        getProjectsMaterials();
        getMaterialsHistory();
    }
    useEffect(() => {
        if (location.state) {
            setName(location.state.data.name)
            setType(location.state.data.type)
            
            setPrice(location.state.data.price)
            setQty(location.state.data.quantity)
            setAvailable(location.state.data.available)
            setReserved(location.state.data.reserved)
            setData(location.state.data)
            
        }
        setChanges([])
        setProjectsMaterials([])
        setLoading(true)
        refresh()
        

    }, [])
    const handleAllProjects = () => {

        history.push(`/projects`)


    }

    const headerTemplateInfo = (options) => {
        const toggleIcon = options.collapsed ? 'pi pi-plus' : 'pi pi-minus';
        return (
            <div className='p-panel-header'>
                <span className="p-panel-title">  <FontAwesomeIcon icon={faBook} className='mr-2' />PROJECTS</span>
                <div className='panel-header-right'>
                    <Button label="All Projects" icon="pi pi-arrow-right" className="p-button-raised p-button-info " onClick={() => handleAllProjects()} />
                    <button className={`${options.togglerClassName} ml-2`} onClick={options.onTogglerClick}>
                        <span className={toggleIcon}></span>

                    </button>
                </div>

            </div>
        )
    }
    const headerMaterialChangesTemplateInfo = (options) => {
        const toggleIcon = options.collapsed ? 'pi pi-plus' : 'pi pi-minus';
        return (
            <div className='p-panel-header'>
                <span className="p-panel-title">  <FontAwesomeIcon icon={faClockRotateLeft} className='mr-2' />HISTORY</span>
                <div className='panel-header-right'>
                   
                    <button className={`${options.togglerClassName} ml-2`} onClick={options.onTogglerClick}>
                        <span className={toggleIcon}></span>

                    </button>
                </div>

            </div>
        )
    }
    const statusBodyTemplate = (rowData) => {
        return <span className={`customer-badge status-${rowData.Project.status.toLowerCase()}`}>{rowData.Project.status}</span>;
    }
    const rowDetailsProject = (rowData) => {

        return (
            <React.Fragment>
                <Button icon="pi pi-info" className="p-button-secondary" onClick={() => history.push(`/projects/${rowData.Project.idProject}/detail`)} />

            </React.Fragment>
        );

    }
    const endDateTemplate = (rowData) => {
        if (!rowData.Project.end_date) {
            return;
        }

        return moment(rowData.Project.end_date).utc().format('YYYY-MM-DD')
    }
    const quantityChangesTemplate = (rowData) => {
        if(rowData.quantity < 0){

            return <span className='negative-quantity' >{rowData.quantity}</span>
        }
        return <span className='positive-quantity' >{rowData.quantity}</span>
    }

    const nameUser = (rowData) => {
        return <span>{rowData.userLogin.firstName} {rowData.userLogin.lastName} </span>
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
    return (
        <>
            <Toast ref={toast} baseZIndex={999999} />
            <div className='title'>
                <h1 >DETAIL</h1>
            </div>

            <div>

                <BreadCrumb model={materials} home={homeMaterials} />

                <div >
                    <Panel header={<span ><FontAwesomeIcon icon={faBookOpen} className='mr-2' /> INFORMATION </span>} className='m-3'>
                        <div className="grid p-fluid m-2">
                            <div className="col-16 md:col-4">
                                <div className="p-inputgroup">
                                    <span className='title-span' >
                                        Reference number: <span className='value-client'> {id}</span>
                                    </span>

                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="p-inputgroup">
                                    <span className='title-span' >
                                        Material's name :  <span className='value-client'> {name}</span>
                                    </span>

                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="p-inputgroup">
                                    <span className='title-span' >
                                        Material's type :  <span className={`type-badge ${type == 'consumable' ? 'consumable-badge' : 'static-badge'} `}> {type}</span>
                                    </span>

                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="p-inputgroup">
                                    <span className='title-span' >
                                        Price :  <span className='value-client'> {price} €</span>
                                    </span>

                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="p-inputgroup">
                                    <span className='title-span' >
                                        Total quantity :  <span className='value-client'> {qty}</span>
                                    </span>

                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="p-inputgroup">
                                    <span className='title-span' >
                                        Reserved quantity :  <span className='value-client'> {reserved}</span>
                                    </span>

                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="p-inputgroup">

                                    <span className='title-span' >
                                        Available quantity :
                                        {available && available > 0 ?
                                            <span className='value-client'> {available}</span> :
                                            <>
                                                <Tooltip target=".custom-target-icon" className='tooltip-color' >
                                                    <h3>Attention</h3>

                                                    <span>There is  <span className='enough'>not enough</span> stock of this material. </span> <br />
                                                    <span>If a project contains a material with insufficient quantity, please  <span className='enough'>take this into consideration.</span>.</span><br />
                                                    <span>You need to order more of this material.</span>
                                                </Tooltip>
                                                <span className='value-client-notavailable ml-1  mr-2'> {available}</span>

                                                <FontAwesomeIcon icon={faWarning} tooltip="Yellow" className="warning-icon-material custom-target-icon" data-pr-position="right" data-pr-my="left center-2" />

                                            </>
                                        }</span>


                                </div>
                            </div>


                        </div>
                    </Panel>
                    <Panel headerTemplate={headerMaterialChangesTemplateInfo} toggleable className='m-3'>
                        <DataTable value={changes} emptyMessage="No history found." className="transaction-datatable mt-1" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts" rows={20}>
                        <Column field='createdAt' style={{ width: '10rem',  flexGrow: 1, flexBasis: '14px'  }} body={(rowData) => { return moment(rowData.createdAt).utc().format('YYYY-MM-DD') }}  sortable header="Transaction Date"  headerStyle={{ color: "#c9392f" }}></Column>    
                            <Column body={nameUser} style={{ width: '10rem',  flexGrow: 1, flexBasis: '14px'  }} className='name'  sortable header="Name"  headerStyle={{ color: "#c9392f" }}></Column>    
                            <Column field='reason' className='reason-style' style={{ width: '10rem',  flexGrow: 1, flexBasis: '14px'  }} body={(rowData) => { return rowData.reason.toUpperCase() }}  header="Reason"  headerStyle={{ color: "#c9392f" }}></Column>
                            <Column body={quantityChangesTemplate} style={{ width: '10rem' }} sortable header="Quantity changes"  headerStyle={{ color: "#c9392f" }}></Column>
                            <Column field='notes' style={{ width: '10rem',  flexGrow: 1, flexBasis: '14px'  }}  header="Notes"  headerStyle={{ color: "#c9392f" }}></Column>
                        
                        </DataTable>

                    </Panel>
                    <Panel headerTemplate={headerTemplateInfo} toggleable className='m-3'>

                        <DataTable loading={loading} value={projectsMaterials} emptyMessage="No projects linked found." className="mt-1" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts" rows={20} paginator>

                            <Column field='Project.name' header="Project's name" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>
                            <Column style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} body={statusBodyTemplate} sortable header="Status" filter filterPlaceholder="Search by name" headerStyle={{ color: "#c9392f" }}></Column>
                            <Column field="Project.start_date" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '200px' }} body={(rowData) => { return moment(rowData.Project.start_date).utc().format('YYYY-MM-DD') }} sortable header="Start Date" filter filterPlaceholder="Search by name" headerStyle={{ color: "#c9392f" }}></Column>
                            <Column field="Project.end_date" style={{ minWidth: '12rem', flexGrow: 1, flexBasis: '50px' }} body={endDateTemplate} sortable header="End Date" headerStyle={{ color: "#c9392f" }}></Column>
                            <Column style={{ width: '5rem', flexGrow: 1, flexBasis: '50px' }} body={rowDetailsProject} ></Column>

                        </DataTable>
                    </Panel>
                </div>

            </div>
        </>
    )
}
export default MaterialInformation