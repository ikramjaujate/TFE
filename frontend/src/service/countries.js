const GetCountries = async () => {

    let informations = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 
      'Authorization': "Bearer " + localStorage.getItem('access_token') },
    };
    return await (fetch(`/api/countries`, informations).then(response => {
      return response.json()
      
    }))
      
}
  export default GetCountries