import { BASIC_HEADERS } from "../shared/consts/headers";

const GetProjects = async () => {
  return await (
    fetch(`/api/projects`, {
      method: 'GET',
      headers: BASIC_HEADERS
    }).then(response => {
      return response.json()
    })
  );
}

const GetPossibleStatuses = async (id) => {
  return await (
    fetch(`/api/projects/${id}/statuses`, {
      method: 'GET',
      headers: BASIC_HEADERS
    }).then(response => {
      return response.json()
    })
  ); 
}

const CreateProject = async (bodyForm) => {
  return await (
    fetch(`/api/projects`, {
      method: 'POST',
      headers: BASIC_HEADERS,
      body: JSON.stringify(bodyForm)
    }).then(response => {
      return response.json()
    })
  ); 
}

const UpdateProject = async (bodyForm) => {
  return await (
    fetch(`/api/projects`, {
      method: 'PATCH',
      headers: BASIC_HEADERS,
      body: JSON.stringify(bodyForm)
    }).then(response => {
      return response.json()
    })
  ); 
}

const GetProjectsByID = async (id) => {
  return await (
    fetch(`/api/projects/${id}`, {
      method: 'GET',
      headers: BASIC_HEADERS
    }).then(response => {
      return response.json()
    })
  ); 
}

const GetDocumentsByProjectId = async (id) => {
  return await (
    fetch(`/api/projects/${id}/documents`, {
      method: 'GET',
      headers: BASIC_HEADERS
    }).then(response => {
      return response.json()
    })
  ); 
}

export {
  GetProjects,
  CreateProject,
  UpdateProject,
  GetProjectsByID,
  GetDocumentsByProjectId,
  GetPossibleStatuses
}