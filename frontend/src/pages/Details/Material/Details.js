import React, { useState, useEffect, useRef } from 'react';


import { faBox, faWarning, faCircleExclamation, faSearch, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import PaginatorTemplate from "../../../shared/components/PaginatorTemplate";
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { DataTable } from 'primereact/datatable';

import * as materialsService from '../../../services/materials'
import * as project_materialsService from '../../../services/project_materials'

const MaterialInformation = ({ dataMaterial }) => {
    const [loading, setLoading] = useState(true)

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0.0)
    const [qty, setQty] = useState(0)
    const [type, setType] = useState('')
    const [available, setAvailable] = useState(0)
    const [reserved, setReserved] = useState(0)
    const [dataMaterials, setDataMaterials] = useState([])
    const [projectsMaterials, setProjectsMaterials] = useState([])

    const getProjectsMaterials = () => {
        setLoading(true)
        project_materialsService.GetProjectByMaterialId(dataMaterial.idMaterial).then(res => {
            if(res.projectMaterial){
                setProjectsMaterials(res.projectMaterial)     
            }else{
                setProjectsMaterials([])     
            }
        })
        
        setLoading(false);
    }
    const refresh = () => {
        getProjectsMaterials();
    }
    useEffect(() => {
        setProjectsMaterials([])
        setLoading(true)
        if (dataMaterial) {
            refresh()
            setName(dataMaterial.name)
            setType(dataMaterial.type)
            setPrice(dataMaterial.price)
            setQty(dataMaterial.quantity)
            setAvailable(dataMaterial.available)
            setReserved(dataMaterial.reserved)

            //console.log(typeof(dataMaterial.Project_Material))
           setLoading(false)
           
            
            
        }

    }, [dataMaterial])

    
    
    return (
        <>
            <div >
                <Panel header={<span ><FontAwesomeIcon icon={faBookOpen} className='mr-2' /> INFORMATION </span>} className='m-1'>
                    <div className="grid p-fluid m-2">
                        <div className="col-12 md:col-3">
                            <div className="p-inputgroup">
                                <span className='title-span' >
                                    Reference number: <span className='value-client'> {dataMaterial?.idMaterial}</span>
                                </span>

                            </div>
                        </div>
                        <div className="col-12 md:col-3">
                            <div className="p-inputgroup">
                                <span className='title-span' >
                                    Material's name :  <span className='value-client'> {name}</span>
                                </span>

                            </div>
                        </div>
                        <div className="col-12 md:col-5">
                            <div className="p-inputgroup">
                                <span className='title-span' >
                                    Material's type :  <span className={`type-badge ${type == 'consumable' ? 'consumable-badge' : 'static-badge'} `}> {type}</span>
                                </span>

                            </div>
                        </div>
                        <div className="col-12 md:col-3">
                            <div className="p-inputgroup">
                                <span className='title-span' >
                                    Price :  <span className='value-client'> {price} €</span>
                                </span>

                            </div>
                        </div>
                        <div className="col-12 md:col-3">
                            <div className="p-inputgroup">
                                <span className='title-span' >
                                    Total quantity :  <span className='value-client'> {qty}</span>
                                </span>

                            </div>
                        </div>
                        <div className="col-12 md:col-3">
                            <div className="p-inputgroup">
                                <span className='title-span' >
                                    Available quantity :  <span className='value-client'> {available}</span>
                                </span>

                            </div>
                        </div>
                        <div className="col-12 md:col-3">
                            <div className="p-inputgroup">
                                <span className='title-span' >
                                    Reserved quantity :  <span className='value-client'> {reserved}</span>
                                </span>

                            </div>
                        </div>
                        

                    </div>
                    <DataTable loading={loading} value={projectsMaterials}  emptyMessage="No projects linked found." className="mt-3" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts" rows={20} paginator>
                        
                        <Column field='Project.name' header="Project's name" headerStyle={{ textAlign: 'center', color: "#c9392f" }}></Column>

                </DataTable>
                </Panel>
            </div>
        </>
    )
}
export default MaterialInformation