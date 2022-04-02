import { BASIC_HEADERS } from "../shared/consts/headers";

const GetCompanies = async () => {
  return await (
    fetch(`/api/company`, {
      method: 'GET',
      headers: BASIC_HEADERS
    }).then(response => {
      return response.json()
    })
  );   
}

const CreateNewCompany = async (bodyForm) => {
  return await (
    fetch(`/api/company`, {
      method: 'POST',
      headers: BASIC_HEADERS,
      body: JSON.stringify(bodyForm)
    }).then(response => {
      return response.json()
    })
  );  
}

const GetCompanyById = async (id) => {
  return await (
    fetch(`/api/company/${id}`, {
      method: 'GET',
      headers: BASIC_HEADERS
    }).then(response => {
      return response.json()
    })
  );
}

const GetProjectsByCompanyID = async (id) => {
  return await (
    fetch(`/api/company/${id}/projects`, {
      method: 'GET',
      headers: BASIC_HEADERS
    }).then(response => {
      return response.json()
    })
  );
}

const UpdateCompany = async (bodyForm) => {
  return await (
    fetch(`/api/company`, {
      method: 'PUT',
      headers: BASIC_HEADERS,
      body: JSON.stringify(bodyForm)
    }).then(response => {
      return response.json()
    })
  );  
}

export {
  GetCompanies,
  CreateNewCompany,
  UpdateCompany,
  GetCompanyById,
  GetProjectsByCompanyID
}