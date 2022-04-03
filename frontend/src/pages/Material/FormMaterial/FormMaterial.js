import '../../../shared/styles/form.scss';

import React, { useState, useEffect, useRef } from "react";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputSwitch } from 'primereact/inputswitch';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Panel } from 'primereact/panel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTools, faInfo, faHourglassStart, faHourglassEnd } from "@fortawesome/free-solid-svg-icons";

import * as materialsService from '../../../services/materials'

const FormMaterial = ({ refreshTable, sendData }) => {
    const toast = useRef(null);
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [isBillable, setIsBillable] = useState(true)
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0.00)

    const typeChoices = ['consumable', 'static']

    const clearForm = () => {
        setName('')
        setType('')
        setIsBillable(true)
        setQuantity(0)
        setPrice(0.00)
        refreshTable()
    }
    const onAddMaterial = (e) => {
        e.preventDefault()


        const bodyForm = {
            'name': name,
            'isBillable': isBillable,
            'quantity': quantity,
            'price': price,
            'type': type,

        }

        materialsService.CreateMaterial(bodyForm).then(response => {

            if (response.hasOwnProperty("newMaterial")) {
                return response
            }
            throw new Error('Something went wrong.');

        }).then(response => {
            toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'New material has been created', life: 3000 });
            clearForm()
        }).catch(error => {
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Material cannot be created', life: 3000 });
        })
    }
    const onUpdateMaterial = (e) => {
        e.preventDefault()


        const bodyForm = {
            'id' : sendData.idMaterial,
            'name': name,
            'isBillable': isBillable,
            'quantity': quantity,
            'price': price,
            'type': type,

        }

        materialsService.UpdateMaterial(bodyForm).then(response => {

            if (response.hasOwnProperty("material")) {
                return response
            }
            throw new Error('Something went wrong.');

        }).then(response => {
            toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Material has been updated', life: 3000 });
            clearForm()
        }).catch(error => {
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Material cannot be updated', life: 3000 });
        })
    }

    useEffect(() => {
        if (sendData) {
         
            setName(sendData.name)
            setType(sendData.type)
            setIsBillable(sendData.isBillable)
            setQuantity(sendData.quantity)
            setPrice(sendData.price)
        }
    
    }, [sendData])


    return (
        <>
            <Toast ref={toast} />

            <Panel className='mt-2' header={
                <span >
                    <FontAwesomeIcon icon={faTools} className='mr-2' />
                    {!sendData ? 'ADD MATERIAL': 'EDIT MATERIAL'}
                </span>
            } toggleable>
                <div className="grid p-fluid m-2">

                    <div className="col-12 md:col-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-book"></i>
                            </span>
                            <InputText value={name} onChange={(e) => setName(e.target.value)} placeholder="Material's name" />
                        </div>

                    </div>

                    <div className="col-12 md:col-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-tag"></i>
                            </span>
                            <Dropdown inputId="dropdown" value={type} options={typeChoices} onChange={(e) => setType(e.target.value)} placeholder="Type" />

                        </div>

                    </div>

                    <div className="col-12 md:col-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                Billable
                            </span>
                            <div className='input-switch'>

                                <InputSwitch className='ml-2' checked={isBillable} onChange={(e) => setIsBillable(e.value)} />
                            </div>
                        </div>

                    </div>

                    <div className="col-12 md:col-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-box"></i>
                            </span>
                            <InputNumber value={quantity} onChange={(e) => setQuantity(e.value)} showButtons mode="decimal" useGrouping={false} placeholder="Quantity" />
                        </div>

                    </div>

                    <div className="col-12 md:col-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                €
                            </span>
                            <InputNumber value={price} onValueChange={(e) => setPrice(e.value)} showButtons mode="currency" currency="EUR" placeholder="Material's name" />
                        </div>

                    </div>




                </div>

                <div className='grid button-demo-flex mx-1' >
                    <div className='btn-container-flex'>
                        <Button label="Clear Form" icon="pi pi-refresh" className="p-button-info" onClick={clearForm} />
                    </div>
                    <div className='btn-container-flex'>
                        <Button label="Add" icon="pi pi-plus" className="p-button-success mr-2" onClick={onAddMaterial} disabled={sendData} />
                        <Button label="Update" icon="pi pi-save" className="p-button-warning " onClick={onUpdateMaterial} disabled={!sendData} />


                    </div>

                </div>


            </Panel>


        </>
    );
}
export default FormMaterial