import { BASIC_HEADERS } from "../shared/consts/headers";

const GetCountries = async () => {
    return await (
        fetch(`/api/countries`, {
            method: 'GET',
            headers: BASIC_HEADERS
        }).then(response => {
            return response.json()
        })
    );      
}

export default GetCountries