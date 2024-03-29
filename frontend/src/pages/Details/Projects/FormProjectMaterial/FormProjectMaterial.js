
import '../../../../shared/styles/form.scss';
import './FormProjectMaterial.css'
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

import { faBox, faWarning, faExclamation, faSearch  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { Tooltip } from 'primereact/tooltip';
import * as projectService from '../../../../services/projects'
import * as materialsService from '../../../../services/materials'
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import Dexie from 'dexie';

const FormProjectMaterial = ({currentContent, disableButton}) => {
    const { id } = useParams();

    const toast = useRef(null);
    const [isDisabled, setIsDisabled] = useState(false)
    const [data, setData] = useState([]);
    const [simpleProject, setSimpleProject] = useState(null)
    const [disable, setDisable] = useState(false)
    const [hasBeenModified, setHasBeenModified] = useState(false)
    const [initialProjectMaterials, setInitialProjectMaterials] = useState([])

    const [projectMaterial, setProjectMaterial] = useState([
        {
            material: {},
            quantity: 0
        }
    ])

    const getProjectMaterials = () => {

        projectService.GetProjectMaterialsByProjectId(id).then(res => {
            const projectMaterials = res['projectMaterials']
            
            
            if(!projectMaterials.length){
                return;
            }
            
            setProjectMaterial(projectMaterials.map( pm => {
                
                return {
                    material: data.find(m => {
                        return m.idMaterial == pm.idMaterial
                    }),
                    quantity: pm.quantity
                }
                
            }))
            setInitialProjectMaterials(projectMaterials.map( pm => {
                
                return {
                    material: data.find(m => {
                        return m.idMaterial == pm.idMaterial
                    }),
                    quantity: pm.quantity
                }
                
            }))
            
            
           

        })
    }
    const getMaterials = () => {
        
        materialsService.GetMaterials().then(res => {
           
            setData(res['materials']);
        })
        
    }
    /*useEffect(() => {
        getMaterials();
        getSimpleProject();
    }, [documentAccepted])*/

    const getSimpleProject = () => {
        
        projectService.getSimpleProjectById(id).then(res => {
            setSimpleProject(res['project']);
            
        })
       
    }

    useEffect(() =>{

        if(currentContent.length){
           
            const projectMaterials = []
            for(let projMat of currentContent){
                if(projMat.idMaterial){
                    projectMaterials.push({
                        material: data.find(m => {
                            return m.idMaterial == projMat.idMaterial
                        }),
                        quantity: projMat.quantity
                    })
                }
            }

           
            setProjectMaterial(projectMaterials)

        }else{
            getMaterials()
            getSimpleProject();
        }
        

    },[currentContent])
    useEffect(() => {
        
        if(disableButton){
            
            setIsDisabled(true)
        }else{
            setIsDisabled(false)
        }
    },[disableButton])

    useEffect(() => {
        
        getSimpleProject();
    }, [])

    useEffect(() => {
        if(!simpleProject){
            return;
        }
        if(['Canceled', 'Accepted', 'Done', 'In Progress', 'Closed'].includes(simpleProject.status)){
            setIsDisabled(true)
        }else{
            setIsDisabled(false)
        }
    }, [simpleProject])
    useEffect(() => {
        getProjectMaterials();
    }, [data])



    const handleFormChange = (index, event) => {

        let data = [...projectMaterial];
        const existingProjMat = projectMaterial.find(pm => {
            return pm.material.idMaterial == event.target.value?.idMaterial
        })
        if(existingProjMat){
            toast.current.show({ severity: 'warn', summary: 'Warning Message', detail: 'You already selected this material', life: 3000 });
            return;
        }
        data[index][event.target.name] = event.target.value;
        setProjectMaterial(data);
        setDisable(true)
        setHasBeenModified(JSON.stringify(initialProjectMaterials) !== JSON.stringify(projectMaterial) )
        

    }

    const addFields = () => {
        let newfield = {
            material: {},
            quantity: 0
        }

        setProjectMaterial([...projectMaterial, newfield])
    }

    const removeFields = (index, event) => {
        let data = [...projectMaterial];

        data.splice(index, 1)
        setProjectMaterial(data)
    }

    const onAddMaterialToProject = (e) => {
        e.preventDefault()
        
        const bodyForm = {
            'idProject' : Number(id),
            'materials' : []
        }
        projectMaterial.forEach((projMat) => {
            bodyForm['materials'].push({
                'idProject' : Number(id),
                'idMaterial' : projMat.material.idMaterial,
                'quantity' : projMat.quantity
            })
            
        })
        
        projectService.UpdateProjectMaterials(bodyForm).then(response => {

            if (response.hasOwnProperty("newProjectMaterials")) {
                return response
            }
            throw new Error('Something went wrong.');

        }).then(response => {
            setHasBeenModified(false)
            toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'New materials has been added to the project', life: 3000 });
        }).catch(error => {
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Materials could not be added to the project', life: 3000 });
        })
       
        return;
    }

   const tooltipTemplate = () => {
    return(
        <span>Quantity available exceeds</span>
    )
   }
   

    return (
        <>
            <Toast ref={toast} baseZIndex={999999} />

            {projectMaterial.map((projMat, index) => {

                return (

                    <div key={index}>
                        <div className="formgrid grid mb-3 ml-2">
                            <div className="p-inputgroup col-4">
                                <span className="p-inputgroup-addon" >
                                    <FontAwesomeIcon icon={faSearch} />
                                </span>
                                <Dropdown name="material" inputId="dropdown" value={projMat.material} options={data} optionLabel="name" onChange={event => handleFormChange(index, event)} disabled={isDisabled} placeholder="Material's name" />

                            </div>
                            <div className="p-inputgroup col-2">
                                <span className='isBillable-section'>
                                    {projMat && (projMat?.material?.isBillable == true)?
                                    <span className="billable-badge status-billable">Billable</span>
                                    : <span className="billable-badge status-not">Not Billable</span>}
                                </span>
                                
                            </div>
                            <div className="p-inputgroup col-2">
                                <span className="p-inputgroup-addon">
                                    <FontAwesomeIcon icon={faBox} />
                                </span>
                                <InputNumber name='quantity' value={projMat.quantity} onValueChange={event => handleFormChange(index, event)} disabled={isDisabled}
                                    placeholder="Quantity" />
                            </div>

                            <div className="p-inputgroup col-1">
                                {(projMat && (projMat?.quantity > projMat?.material?.quantity)) ?
                                <div>
                                <Tooltip target=".custom-target-icon" >
                                    
                                <span>Quantity available exceeds</span>
                                    </Tooltip>
                                    <FontAwesomeIcon icon={faWarning} tooltip="Yellow" className="warning-icon custom-target-icon"  data-pr-position="right"  data-pr-my="left center-2"  /></div>: 
                                    <span></span>
                                }
                            </div>

                            <div className="p-inputgroup col-1">
                                <Button icon="pi pi-minus" className="restfield p-button-raised p-button-rounded m-auto" onClick={event => removeFields(index, event)} disabled={isDisabled} />
                            </div>
                        </div>


                    </div>)
            })}



            <div className='btn-container-flex'>

                <Button icon="pi pi-plus" className="addfield p-button-raised p-button-rounded mr-2 ml-3" onClick={addFields} disabled={isDisabled} />

            </div>


            <div className='grid button-demo-flex mx-1' >
                <div className='btn-container-flex'>
                </div>
                <div className='btn-container-flex '>
                    {hasBeenModified ?  <div className='is-modified'><span className='is-modified-span'> ❗️ Modified ❗️</span></div> : <></>}
                 {/*<Button label="Modify" icon="pi pi-save" onClick={onAddMaterialToProject} className="p-button-warning " disabled={isDisabled} autoFocus />*/}
                    <Button label="Update" icon="pi pi-save" onClick={onAddMaterialToProject} className="p-button-warning " disabled={isDisabled} autoFocus />

                </div>

            </div>



        </>
    )
}
export default FormProjectMaterial