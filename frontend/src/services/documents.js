const UploadPdfDocument = async (id, bodyForm) => {
  
  let informations = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/pdf',
      'Authorization': "Bearer " + localStorage.getItem('access_token')
    },
    //body: JSON.stringify(bodyForm)
    body: bodyForm
  };

  return await (fetch(`/api/documents/${id}`, informations).then(response => {
    
    return response.json()
  }))
}
const CreateDocuments = async (id, bodyForm) => {

  let informations = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('access_token')
    },
    body: JSON.stringify(bodyForm)
  };
  return await (fetch(`/api/projects/${id}/documents`, informations).then(response => {
    
    return response.json()
  }))
}
export {
  CreateDocuments,
  UploadPdfDocument
}