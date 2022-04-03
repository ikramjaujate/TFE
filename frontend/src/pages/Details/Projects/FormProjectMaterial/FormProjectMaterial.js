
import '../../../../shared/styles/form.scss';
import './FormProjectMaterial.css'
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

import { faBox, faWarning, faCircleExclamation, faSearch  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';

import * as projectService from '../../../../services/projects'
import * as materialsService from '../../../../services/materials'
import { InputNumber } from 'primereact/inputnumber';


const FormProjectMaterial = () => {
    const { id } = useParams();

    const toast = useRef(null);
    const [isDisabled, setIsDisabled] = useState(false)
    const [data, setData] = useState([]);
    const [simpleProject, setSimpleProject] = useState(null)
    const [disable, setDisable] = useState(false)

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


        })
    }
    const getMaterials = () => {
        
         materialsService.GetMaterials().then(res => {
            setData(res['materials']);
        })
        
    }

    const getSimpleProject = () => {
        
        projectService.getSimpleProjectById(id).then(res => {
            setSimpleProject(res['project']);
            
       })
       
   }

    useEffect(() => {
        getMaterials();
        getSimpleProject();
    }, [])
    useEffect(() => {
        if(!simpleProject){
            return;
        }
        if(['Canceled', 'Done'].includes(simpleProject.status)){
            
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
            console.log(response)
            toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'New materials has been added to the project', life: 3000 });

        }).catch(error => {
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Materials could not be added to the project', life: 3000 });
        })
        console.log(bodyForm)
        return;
    }

   

    return (
        <>
            <Toast ref={toast} />

            {projectMaterial.map((projMat, index) => {

                return (

                    <div key={index}>
                        <div className="formgrid grid mb-3 ml-2">
                            <div className="p-inputgroup col-7">
                                <span className="p-inputgroup-addon" >
                                    <FontAwesomeIcon icon={faSearch} />
                                </span>
                                <Dropdown name="material" inputId="dropdown" value={projMat.material} options={data} optionLabel="name" onChange={event => handleFormChange(index, event)} disabled={isDisabled} placeholder="Material's name" />

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
                                <FontAwesomeIcon icon={faWarning} className="warning-icon" />: 
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

                        <Button label="Update" icon="pi pi-save" onClick={onAddMaterialToProject} className="p-button-warning " disabled={isDisabled} autoFocus />

                </div>

            </div>



        </>
    )
}
export default FormProjectMaterial