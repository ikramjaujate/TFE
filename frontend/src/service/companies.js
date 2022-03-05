const GetCompanies = async () => {

    let informations = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 
      'Authorization': "Bearer " + localStorage.getItem('access_token') },
    };
    return await (fetch(`/api/company`, informations).then(response => {
        console.log(response)
      return response.json()
    }))
      
}
export {
    GetCompanies
  }