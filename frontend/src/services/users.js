const GetClients = () => {
    let informations = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + localStorage.getItem('access_token') },
    };
    fetch(`/api/users`, informations)
      .then(response => {
        return response.json()
      }).then(response => {
        //console.log(response["users"])
        return response["users"]
      })
  }
  export default GetClients