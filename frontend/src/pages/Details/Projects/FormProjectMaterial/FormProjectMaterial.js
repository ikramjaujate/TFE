
import '../../../../shared/styles/form.scss';

import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

import { faBox  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';

import * as projectService from '../../../../services/projects'
import * as materialsService from '../../../../services/materials'
import { InputNumber } from 'primereact/inputnumber';


const FormProjectMaterial = () => {
    const { id } = useParams();

    const [name, setName] = useState("")
    const toast = useRef(null);
    const [data, setData] = useState([]);
    const [projectMaterials, setProjectMaterials] = useState([])
    const [disable, setDisable] = useState(false)
    const [fileName, setFileName] = useState('')

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
                        console.log(m)
                        return m.idMaterial == pm.idMaterial
                    }),
                    quantity: pm.quantity
                }
            }))
            console.log(res['projectMaterials'])
        })
    }
    const getMaterials = () => {
        
         materialsService.GetMaterials().then(res => {
            setData(res['materials']);
            console.log()
        })
        
    }

    useEffect(() => {
        getMaterials();
    }, [])
    
    useEffect(() => {
        getProjectMaterials();
    }, [data])



    const handleFormChange = (index, event) => {

        let data = [...projectMaterial];
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
                                <span className="p-inputgroup-addon">
                                    <FontAwesomeIcon icon={faBox} />
                                </span>
                                <Dropdown name="material" inputId="dropdown" value={projMat.material} options={data} optionLabel="name" onChange={event => handleFormChange(index, event)} placeholder="Material's name" />

                            </div>
                            <div className="p-inputgroup col-2">
                                <span className="p-inputgroup-addon">
                                    <FontAwesomeIcon icon={faBox} />
                                </span>
                                <InputNumber name='quantity' value={projMat.quantity} onValueChange={event => handleFormChange(index, event)}
                                    placeholder="Quantity" />
                            </div>



                            <div className="p-inputgroup col-2">
                                <Button icon="pi pi-minus" className="restfield p-button-raised p-button-rounded mt-1" onClick={event => removeFields(index, event)} />
                            </div>
                        </div>


                    </div>)
            })}



            <div className='btn-container-flex'>

                <Button icon="pi pi-plus" className="addfield p-button-raised p-button-rounded mr-2 ml-3" onClick={addFields} />

            </div>


            <div className='grid button-demo-flex mx-1' >
                <div className='btn-container-flex'>
                </div>
                <div className='btn-container-flex '>

                        <Button label="Update" icon="pi pi-save" onClick={onAddMaterialToProject} className="p-button-warning " autoFocus />

                </div>

            </div>



        </>
    )
}
export default FormProjectMaterial