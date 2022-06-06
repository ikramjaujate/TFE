import '../../../shared/styles/form.scss';

import React, { useState, useEffect, useRef } from "react";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import GetCountries from "../../../services/countries";
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import { Toast } from 'primereact/toast';
import Dexie from 'dexie';
import { TabView, TabPanel } from 'primereact/tabview';
import { Panel } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
import { SelectButton } from 'primereact/selectbutton';
import { RiContactsBookLine } from 'react-icons/ri';
import { Calendar } from 'primereact/calendar';
import { max } from 'moment';
import { faFlagCheckered, faInfo, faHourglassStart, faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UpdateProject, GetPossibleStatuses } from '../../../services/projects';
import { projectTypes } from '../../../shared/consts/projectTypes';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import moment from "moment";
import * as projectService from '../../../services/projects'
import * as materialService from '../../../services/materials'
const FormProject = ({ refreshTable, sendData }) => {

    const toast = useRef(null);
    const [clientName, setClientName] = useState('');
    const [name, setName] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [isCompany, setIsCompany] = useState(false);
    const [status, setStatus] = useState("Pre-Sale")
    const [idProject, setIdProject] = useState(null)
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([]);
    
    const [notAvailable, setNotAvailable] = useState(false)

    const [projectMaterial, setProjectMaterial] = useState([
        {
            material: {},
            quantity: 0
        }
    ])

    let today = new Date();
    let maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))



    const getProjectMaterials = () => {

        projectService.GetProjectMaterialsByProjectId(sendData.id).then(res => {
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

            for(const pm of projectMaterials){
                if(pm.quantity > pm.Material.quantity){
                    setNotAvailable(true)
                    break;
                }
            }

        })
    }
    


    const clearForm = () => {
        setClientName('')
        setName('')
        setStatus('Pre-Sale')
        setStartDate('')
        setEndDate('')
        refreshTable()
    }
    const options = [
        { name: 'Person', value: false },
        { name: 'Company', value: true }
    ];

    const [filterStatus, setFilterStatus] = useState([...projectTypes])

    useEffect(() => {

        if (sendData) {

            let displayName = (sendData.displayName).replace(/,/g, '');

            setName(sendData.name)
            setIdProject(sendData.id)
            setClientName(displayName)
            setStartDate(new Date(sendData.start_date))
            setStatus(sendData.status)

            setEndDate(sendData.end_date ? new Date(sendData.end_date) : new Date())
            if (sendData.type == 'p') {
                setIsCompany(false)
            } else {
                setIsCompany(true)
            }
            checkAvailableStatus()
            getProjectMaterials()
        }

    }, [sendData])

    const confirmCanceledStatus = (bodyForm) => {
        confirmDialog({
            message: 'Are you sure you want to cancel the project?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => { updateProjectStatus(bodyForm) },
            reject: () => { }
        });
    };

    const confirmChangeDate = (bodyForm) => {
        confirmDialog({
            message: "The end date of the project does not match today's date, are you sure you want to continue ?",
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => { updateProjectStatus(bodyForm) },
            reject: () => { }
        });
    };

    const confirmProgressStatus = (bodyForm) => {
        confirmDialog({
            message: 'There is not enough stock available to fullfil. Are you sure you want to continue ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => { updateProjectStatus(bodyForm) },
            reject: () => { }
        });
    };
    const confirmClosedStatus = (bodyForm) => {
        confirmDialog({
            message: 'The project cannot be further modified. Are you sure you want to continue?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => { updateProjectStatus(bodyForm) },
            reject: () => { }
        });
    };

    const updateProjectStatus = (bodyForm) => {
        UpdateProject(bodyForm).then(response => {

            if (response.hasOwnProperty("project")) {
                return response
            }
            throw new Error('Something went wrong.');

        }).then(response => {
            toast.current.show({ severity: 'info', summary: 'Success Message', detail: 'Project has been updated', life: 3000 });
            clearForm()
            Dexie.delete('MyDatabase');
            materialService.databaseCreation()
        }).catch(error => {
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Project cannot be updated', life: 3000 });
        })
    }
    const handleClickUpdate = (e) => {
        e.preventDefault()

        const bodyForm = {
            'id': sendData.id,
            'name': name,
            'status': status,
            'start_date': new Date(start_date),
            'end_date': end_date ? new Date(end_date) : null
        }
        if (bodyForm.status == 'Canceled') {
            confirmCanceledStatus(bodyForm)
            return;
        }
        if (bodyForm.status == 'Closed') {
            confirmClosedStatus(bodyForm)
            return;
        }
        
        if(bodyForm.status == 'Done'){
            
            const formDate = bodyForm.end_date.toISOString().split('T')[0]
            const date= (new Date()).toISOString().split('T')[0]
            if(formDate != date){
                confirmChangeDate(bodyForm)
                return;
            }
        }

        if(bodyForm.status == 'In Progress' && notAvailable){
            confirmProgressStatus(bodyForm)
            return;
        }

        updateProjectStatus(bodyForm)
    }

    const checkAvailableStatus = () => {
        if (!sendData) {

            setFilterStatus([...projectTypes])
            return
        }
        GetPossibleStatuses(sendData.id).then(response => {
            setFilterStatus([...response["types"]])
            console.log(response['types'])
        })


    }

    return (
        <>
            <Toast ref={toast} baseZIndex={999999} />

            <Panel className='mt-2' header={<span >
                <i className="pi pi-book mr-2"></i>
        EDIT PROJECT
            </span>} toggleable>
                <div className="grid p-fluid m-2">

                    <div className="col-12 md:col-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-book"></i>
                            </span>
                            <InputText value={name} onChange={(e) => setName(e.target.value)} placeholder="Project's name" />
                        </div>
                    </div>
                    {isCompany ? <div className="col-12 md:col-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">

                                <i className="pi pi-building"></i>


                            </span>
                            <InputText value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client's name" disabled />
                        </div>
                    </div> : <div className="col-12 md:col-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">

                                <i className="pi pi-user"></i>


                            </span>
                            <InputText value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client's name" disabled />
                        </div>
                    </div>}
                    <div className="col-12 md:col-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <FontAwesomeIcon icon={faHourglassStart} />
                            </span>
                            <Calendar className='select-day' id="icon" value={start_date} onChange={(e) => setStartDate(e.value)} showIcon maxDate={maxDate} />
                        </div>
                    </div>
                    <div className="col-12 md:col-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <FontAwesomeIcon icon={faInfo} />
                            </span>
                            <Dropdown className='my-dropdown' value={status} options={filterStatus} onChange={(e) => setStatus(e.value)} />
                           
                        </div>
                    </div>
                    <div className="col-12 md:col-4">
                    </div>
                    <div className="col-12 md:col-4">
                        <div className="p-inputgroup ">
                            <span className="p-inputgroup-addon">
                                <FontAwesomeIcon icon={faHourglassEnd} />
                            </span>
                            <Calendar className='select-day' id="icon" value={end_date} onChange={(e) => setEndDate(e.value)} showIcon minDate={today} maxDate={maxDate} />
                        </div>
                    </div>


                </div>

                <div className='grid button-demo-flex mx-1' >
                    <div className='btn-container-flex'>
                        <Button label="Clear Form" icon="pi pi-refresh" className="p-button-info" onClick={clearForm} />
                    </div>
                    <div className='btn-container-flex'>
                        <SelectButton value={isCompany} options={options} className=" mr-2" onChange={(e) => setIsCompany(e.value)} optionLabel="name" disabled />
                        <Button label="Update" icon="pi pi-save" className="p-button-warning " onClick={handleClickUpdate} disabled={!sendData || sendData?.status == "Canceled"} />


                    </div>

                </div>


            </Panel>


        </>
    );
}
export default FormProject