import React, { useState, useEffect } from 'react';
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";

const Quotation = () => {

  var props = {
    outputType: OutputType.Blob,
    returnJsPDFDocObject: true,
    fileName: "Invoice 2021",
    orientationLandscape: false,
    compress: true,
    logo: {
      src: "logo.png",
      width: 24, //aspect ratio = width/height
      height: 24,
      margin: {
        top: 0, //negative or positive num, from the current position
        left: 0 //negative or positive num, from the current position
      }
    },
    business: {
      name: "Master Services",
      address: "Koning Albertstraat 124, 1600 Sint-Pieters-Leeuw, Belgium",
      phone: "(+32) 479 03 32 48",
      email: "info@masterservices.com",
      email_1: "BE 0849.720.889",
      website: "www.masterservices.be",
    },
    contact: {
      name: "Ikram Jaujate",
      address: "Avenue Floride 43, 1180 Uccle",

    },
    invoice: {
      label: "Invoice number : ",
      num: 19,
      invDate: "Quotation date : " + new Date().toDateString(),
      headerBorder: true,
      backgroundColor: 'red',
      tableBodyBorder: false,
      header: [
        {
          title: "#",
          style: {
            width: 10,
          }
        },
        {
          title: "Title",
          style: {
            width: 40
          }
        },
        {
          title: "Description",
          style: {
            width: 80
          }
        },
        { title: "Price" },
        { title: "Quantity" },
        { title: "Unit" },
        { title: "Total" }
      ],
      table: Array.from(Array(2), (item, index) => ([
        index + 1,
        "There are many variations ",
        "Lorem Ipsum is simply dummy text dummy text ",
        200.5,
        4.5,
        "m2",
        400.5
      ])),
      invTotalLabel: "Total:",
      invTotal: "145,250.50",
      invCurrency: "ALL",
      row1: {
        col1: 'VAT:',
        col2: '20',
        col3: '%',
        style: {
          fontSize: 10 //optional, default 12
        }
      },
      row2: {
        col1: 'SubTotal:',
        col2: '116,199.90',
        col3: 'ALL',
        style: {
          fontSize: 10 //optional, default 12
        }
      },
      invDescLabel: "Invoice Note",
      invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
    },
    footer: {
      text: "The invoice is created on a computer and is valid without the signature and stamp.",
    },

    fontStyle: "Arial"
  };
  const generate = () => {
    
    const pdfObject = jsPDFInvoiceTemplate(props);
    //setFileUrl(URL.createObjectURL(pdfObject.blob));

    //var blob = new Blob([ pdfObject.blob ], { type : 'application/pdf'});
    window.open(URL.createObjectURL(pdfObject.blob));


  }

  return (
    <>
      <div className='title'>
        <h1>QUOTATION</h1>
      </div>

    </>
  )
}
export default Quotation