const GetCompanies = async () => {

  let informations = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 
      'Authorization': "Bearer " + localStorage.getItem('access_token') },
  };
  return await (fetch(`/api/company`, informations).then(response => {
    return response.json()
  }))
      
}

const CreateNewCompany = async (bodyForm) => {

  let informations = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('access_token')
    },
    body: JSON.stringify(bodyForm)
  };
  return await (fetch(`/api/company`, informations).then(response => {
    return response.json()
  }))
}

const GetCompanyById = async (id) => {

  let informations = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('access_token')
    },
  };
  return await (fetch(`/api/company/${id}`, informations).then(response => {
    return response.json()
  }))

}
const GetProjectsByCompanyID = async (id) => {

  let informations = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('access_token')
    },
  };
  return await (fetch(`/api/company/${id}/projects`, informations).then(response => {
    return response.json()
  }))

}
const UpdateCompany = async (bodyForm) => {

  let informations = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('access_token')
    },
    body: JSON.stringify(bodyForm)
  };
  return await (fetch(`/api/company`, informations).then(response => {
    return response.json()
  }))
}
export {
  GetCompanies,
  CreateNewCompany,
  UpdateCompany,
  GetCompanyById,
  GetProjectsByCompanyID
}