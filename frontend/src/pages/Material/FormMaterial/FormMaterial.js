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
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';

import * as materialsService from '../../../services/materials'
import { rangesOverlap } from 'dexie';

const FormMaterial = ({ refreshTable, sendData }) => {

    const toast = useRef(null);
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [isBillable, setIsBillable] = useState(true)
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0.00)
    const [reason, setReason] = useState(null)
    const [notes, setNotes] = useState(null)
    const [quantityDialog, setQuantityDialog] = useState(false)

    const typeChoices = ['consumable', 'static']
    const reasonChoices = ['inventory', 're-stock', 'defect', 'loss']

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
            'type': type
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

    const updateMaterial = () => {
        console.log('test')
        const bodyForm = {
            'id': sendData.idMaterial,
            'name': name,
            'isBillable': isBillable,
            'quantity': quantity,
            'price': price,
            'type': type,
            'reason': reason,
            'notes': notes,
            'quantityChanges' : quantity - sendData.quantity
        }

        materialsService.UpdateMaterial(bodyForm).then(response => {

            if (response.hasOwnProperty("material")) {
                return response
            }
            throw new Error('Something went wrong.');

        }).then(response => {
            toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Material has been updated', life: 3000 });
            setQuantityDialog(false)
            clearForm()
        }).catch(error => {
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Material cannot be updated', life: 3000 });
        })
    }

    const onUpdateMaterial = (e) => {
        e.preventDefault()

        if (sendData.quantity == quantity) {
            updateMaterial()
            return;
        }

        setQuantityDialog(true)
        


    }

    const onQuantityDialogCancel = () => {
        setQuantityDialog(false)
        setQuantity(sendData.quantity)
        setReason(null)
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

    const selected = (option, props) => {
        setReason(option)
    }
    return (
        <>
            <Toast ref={toast} baseZIndex={999999} />

            <Panel className='mt-2' header={
                <span >
                    <FontAwesomeIcon icon={faTools} className='mr-2' />
                    {!sendData ? 'ADD MATERIAL' : 'EDIT MATERIAL'}
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

            <Dialog header="Reason for quantity changes" visible={quantityDialog} style={{ width: '50vw' }} onHide={() => setQuantityDialog(false)}>
                <div className="grid p-fluid m-2">

                    <div className='col-12 md:col-12'>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
            <i className='pi pi-info'></i>
                            </span>
                            <Dropdown className='my-dropdown' value={reason}  options={reasonChoices} onChange={(e) => setReason(e.value)} placeholder="Reasons" />
                        </div>

                    </div>


                    <div className='col-12 md:col-12'>
                        <span className='mr-2 mt-4'>Notes</span>
                        <InputTextarea id="notes" className='mt-2' value={notes} onChange={event => setNotes(event.target.value)} required rows={3} cols={20} />



                    </div>
                </div>
                <Button label='Add' className="p-button p-component p-button-success" onClick={updateMaterial} />
                <Button label='Cancel' className="p-button-text" onClick={onQuantityDialogCancel} />
            </Dialog>


        </>
    );
}
export default FormMaterial