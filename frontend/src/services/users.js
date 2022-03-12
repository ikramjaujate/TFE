const GetClients = async () => {

  let informations = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('access_token')
    },
  };
  return await (fetch(`/api/users`, informations).then(response => {
    return response.json()
  }))

}

const GetClientByID = async (id) => {

  let informations = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('access_token')
    },
  };
  return await (fetch(`/api/users/${id}`, informations).then(response => {
    return response.json()
  }))

}

const GetProjectsByClientID = async (id) => {

  let informations = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('access_token')
    },
  };
  return await (fetch(`/api/users/${id}/projects`, informations).then(response => {
    return response.json()
  }))

}

const CreateNewClient = async (bodyForm) => {

  let informations = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('access_token')
    },
    body: JSON.stringify(bodyForm)
  };
  return await (fetch(`/api/users`, informations).then(response => {
    return response.json()
  }))
}

const UpdateUser = async (bodyForm) => {

  let informations = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('access_token')
    },
    body: JSON.stringify(bodyForm)
  };
  return await (fetch(`/api/users`, informations).then(response => {
    return response.json()
  }))
}


export {
  CreateNewClient,
  GetClients,
  UpdateUser,
  GetClientByID,
  GetProjectsByClientID
}
