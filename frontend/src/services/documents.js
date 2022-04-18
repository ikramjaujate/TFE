import Dexie from "dexie";
import { BASIC_HEADERS, PDF_HEADERS } from "../shared/consts/headers";

const UploadPdfDocument = async (id, bodyForm) => {
    return await (
        fetch(`/api/documents/${id}/pdf`, {
            method: 'PATCH',
            headers: PDF_HEADERS,
            body: bodyForm
        }).then(response => {
            return response.json()
        })
    );
}

const GetAllQuotations = async () => {
    return await (
        fetch(`/api/quotations`, {
            method: 'GET',
            headers: BASIC_HEADERS
        }).then(response => {
            return response.json()
        })
    ); 
}


const UploadDocumentState = async (id, bodyForm) => {
    return await (
        fetch(`/api/documents/${id}`, {
            method: 'PATCH',
            headers: BASIC_HEADERS,
            body: JSON.stringify(bodyForm)
        }).then(response => {
            return response.json()
        })
    );
}

const CreateDocuments = async (bodyForm) => {
    return await (
        fetch(`/api/documents`, {
            method: 'POST',
            headers: BASIC_HEADERS,
            body: JSON.stringify(bodyForm)
        }).then(response => {
            return response.json()
        })
    );
}

const SendDocument = async (bodyForm) => {
    return await (
        fetch(`/api/sendDocument`, {
            method: 'POST',
            headers: BASIC_HEADERS,
            body: JSON.stringify(bodyForm)
        }).then(response => {
            return response.json()
        })
    );
}

export {
    CreateDocuments,
    UploadPdfDocument,
    UploadDocumentState,
    SendDocument,
    GetAllQuotations
}