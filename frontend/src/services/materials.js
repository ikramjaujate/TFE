import { BASIC_HEADERS } from "../shared/consts/headers";

const GetMaterials = async () => {
    return await (
        fetch(`/api/materials`, {
            method: 'GET',
            headers: BASIC_HEADERS
        }).then(res => {
            return res.json()
        })
    );
}


const CreateMaterial = async (bodyForm) => {
    return await (
        fetch(`/api/materials`, {
            method: 'POST',
            headers: BASIC_HEADERS,
            body: JSON.stringify(bodyForm)
        }).then(response => {
            return response.json()
        })
    ); 
}

const UpdateMaterial = async (bodyForm) => {
    return await (
        fetch(`/api/materials`, {
            method: 'PATCH',
            headers: BASIC_HEADERS,
            body: JSON.stringify(bodyForm)
        }).then(response => {
            return response.json()
        })
    ); 
}

export {
    GetMaterials,
    CreateMaterial,
    UpdateMaterial
}