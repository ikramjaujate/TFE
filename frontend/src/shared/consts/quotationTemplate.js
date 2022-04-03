import { OutputType, jsPDF } from "jspdf-invoice-template";

var quotationTemplate = {
  outputType: OutputType.Blob,
  returnJsPDFDocObject: true,
  fileName: "Invoice 2021",
  orientationLandscape: false,
  compress: true,
  logo: {
    src: "../../logo.png",
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
    label: "Project number ",
    num: 19,
    invDate: "Quotation date : " + new Date().toDateString(),
    headerBorder: true,
    backgroundColor: 'red',
    tableBodyBorder: false,
    header: [

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
      { title: "Price (€)" },
      { title: "Qty", 
        style: {
          width: 10
        } },
      { title: "Total (€)" }
    ],
    table: Array.from(Array(2), (item, index) => ([

      "There are many variations ",
      "Lorem Ipsum is simply dummy text dummy text ",
      200.5,
      4.5,
      400.5
    ])),
    invTotalLabel: "Total:",
    invTotal: "145,250.50",
    invCurrency: "(€)",
    row1: {
      col1: 'VAT:',
      col2: '21',
      col3: '%',
      style: {
        fontSize: 10 //optional, default 12
      }
    },
    row2: {
      col1: 'SubTotal:',
      col2: '116,199.90',
      col3: '(€)',
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

export {
  quotationTemplate
}