const GetProjects = async () => {

  let informations = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('access_token')
    },
  };
  return await (fetch(`/api/projects`, informations).then(response => {
    console.log(response)
    return response.json()
  }))
  
}
const CreateProject = async (bodyForm) => {

  let informations = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('access_token')
    },
    body: JSON.stringify(bodyForm)
  };
  return await (fetch(`/api/projects`, informations).then(response => {
    return response.json()
  }))
}

const UpdateProject = async (bodyForm) => {

  let informations = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('access_token')
    },
    body: JSON.stringify(bodyForm)
  };
  return await (fetch(`/api/projects`, informations).then(response => {
    return response.json()
  }))
}
export {
  GetProjects,
  CreateProject,
  UpdateProject
}