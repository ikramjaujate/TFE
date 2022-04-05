import { BASIC_HEADERS } from "../shared/consts/headers";

const GetProjectsMaterials = async () => {
    return await (
        fetch(`/api/project-materials`, {
            method: 'GET',
            headers: BASIC_HEADERS
        }).then(res => {
            return res.json()
        })
    );
}

const GetProjectByMaterialId = async (id) => {
    return await (
        fetch(`/api/project-materials/${id}/projects`, {
            method: 'GET',
            headers: BASIC_HEADERS
        }).then(response => {
            return response.json()
        })
    ); 
}

export {
    GetProjectByMaterialId,
    GetProjectsMaterials
}