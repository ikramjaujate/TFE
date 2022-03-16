
import './AddQuotation.css'
import '../../../shared/styles/form.scss';
import React, { useState , useRef, useEffect} from "react";
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from "primereact/inputtext";
import { faEuro, faPlus, faBox, faMoneyCheckDollar, faAlignJustify, faT, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from "primereact/button";
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";
import { Toast } from 'primereact/toast';
import { GetProjectsByID } from '../../../services/projects';
import { quotationTemplate } from '../../../shared/consts/quotationTemplate';
import {CreateDocuments, UploadPdfDocument} from '../../../services/documents';

const AddQuotation = (sendId, clientName) => {
  const [name, setName] = useState("")
  const toast = useRef(null);
  const [notes, setNotes] = useState("/")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState([])
  const [price, setPrice] = useState([])
  const [quantity, setQuantity] = useState([])
  const [previewImg, setPreviewImg] = useState(null) 
  const [disable, setDisable] = useState(false)

  const getProject = () => {
    

    GetProjectsByID(sendId.sendId).then(response => {
      if (response['project'][0].idCompany == null) {
        setName(`${response["project"][0].Person.firstName} ${response["project"][0].Person.lastName}`)


      } else {

        setName(`${response["project"][0].Company.name}`)

      }
    })
  }
  useEffect(() => {
    getProject()
  }, [])
  const [quotation, setQuotation] = useState([
    {
      title: '',
      description: '',
      price: 0,
      quantity: 1
    }
  ])

  
  const handleFormChange = (index, event) => {

    let data = [...quotation];


    data[index][event.target.name] = event.target.value;


    setQuotation(data);
    setDisable(true)

  }
  const addFields = () => {
    let newfield = {
      title: '',
      description: '',
      price: 0,
      quantity: 1
    }

    setQuotation([...quotation, newfield])
  }
 
  const removeFields = (index) => {
    let data = [...quotation];
    data.splice(index, 1)
    setQuotation(data)
  }
  const generate = () => {

    if(notes.length == 0){
      setNotes('/')
      quotationTemplate.invoice.invDesc = notes
    }

    let table = [Array.from(Array(quotation.length).keys())]
   
    quotationTemplate.contact.name = name
    quotationTemplate.invoice.invDesc = notes
    quotationTemplate.invoice.title = title

    for(let i in quotation){
      const index = table.indexOf(quotation[i]);
      console.log(quotation[i])
      let ajout = []
      for (let x in quotation[i]) {
         
        ajout.push(quotation[i][x])
        
      }
      table[i]= ajout
    }
    
    for (let i = 0; i < table.length; i++) {
      table[i].push((Number(table[i][2]) * Number(table[i][3]) ).toFixed(2)); }
    let total = 0
    for(let i = 0; i < table.length; i++){
      total += Number(table[i][4])
    }
    let withVta = ((total * 0.2) + total).toFixed(2)
    quotationTemplate.invoice.row2.col2 = String(total.toFixed(2))
    quotationTemplate.invoice.invTotal = String(withVta)
    quotationTemplate.invoice.table = table
    
    const pdfObject = jsPDFInvoiceTemplate(quotationTemplate);
    console.log(pdfObject.blob)
    
    const bodyForm = {
      'type': 'devis',
      'isAccepted': false,
      'isPaid': false,
      'notes': notes
    }
    CreateDocuments(sendId.sendId, bodyForm).then(response => {
      console.log(response)
      if (response.hasOwnProperty("documents")) {
        return response
      }
      throw new Error('Something went wrong.');

    }).then(response => {

      UploadPdfDocument(response.documents.idDocument, pdfObject.blob).then(response => {
       
        if (response.hasOwnProperty("document")) {
          return response
        }
        throw new Error('Something went wrong.');
      }).then(response => {
      
        toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'New quotation has been created', life: 3000 });
      }).catch(error => {
        toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Quotation cannot be created', life: 3000 });
      })
    }).catch(error => {
      toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Quotation cannot be created', life: 3000 });
    })
    
  }

  return (
    <>
      <Toast ref={toast} />
      {quotation.map((quote, index) => {

        return (

          <div key={index}>
            <div className="formgrid grid mb-3">
              <div className="p-inputgroup col-3">
                <span className="p-inputgroup-addon">
                  <FontAwesomeIcon icon={faT} />
                </span>
                <InputText name='title' value={quote.title} onChange={event => handleFormChange(index, event)}
                  placeholder="Title" />
              </div>
              <div className="p-inputgroup col-3">
                <span className="p-inputgroup-addon">
                  <FontAwesomeIcon icon={faAlignJustify} />
                </span>
                <InputText name='description' value={quote.description} onChange={event => handleFormChange(index, event)}
                  placeholder="Description" />
              </div>
              <div className="p-inputgroup col-3">
                <span className="p-inputgroup-addon">
                  <FontAwesomeIcon icon={faEuro} />
                </span>
                <InputText name='price' value={quote.price} onChange={event => handleFormChange(index, event)}
                  placeholder="Price" />
              </div>
              <div className="p-inputgroup col-3">
                <span className="p-inputgroup-addon">
                  <FontAwesomeIcon icon={faBox} />
                </span>
                <InputText name='quantity' value={quote.quantity} onChange={event => handleFormChange(index, event)}
                  placeholder="Quantity" />
              </div>
            </div>


          </div>)
      })}



      <div className='btn-container-flex'>

        <Button icon="pi pi-plus" className="addfield p-button-raised p-button-rounded mr-2" onClick={addFields} />
        <Button icon="pi pi-minus" className="restfield p-button-raised p-button-rounded" onClick={removeFields} />
      </div>

      <div className="formgrid grid my-4">
        <div className="p-inputgroup col-12">
          <span className='mr-2 mt-4'>Notes</span>
          <InputTextarea id="notes" value={notes} onChange={event => setNotes(event.target.value)} required rows={3} cols={20} />
        </div>


      </div>
      <div className='grid button-demo-flex mx-1' >
        <div className='btn-container-flex'>

        </div>
        <div className='btn-container-flex mt-3'>

          {disable ?
            <Button label="Add" icon="pi pi-check" onClick={generate} className="p-button-success rajout" autoFocus  />
            : <Button label="Add" icon="pi pi-check" onClick={generate} className="p-button-success rajout" autoFocus disabled={!disable}/>}

        </div>

      </div>



    </>
  )
}
export default AddQuotation