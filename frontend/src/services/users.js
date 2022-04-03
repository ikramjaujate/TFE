import { BASIC_HEADERS } from "../shared/consts/headers";

const GetClients = async () => {
    return await (
        fetch(`/api/users`, {
            method: 'GET',
            headers: BASIC_HEADERS
        }).then(response => {
            return response.json()
        })
    );
}

const GetClientsWithProjects = async () => {
    return await (
        fetch(`/api/simple-users`, {
            method: 'GET',
            headers: BASIC_HEADERS
        }).then(response => {
            return response.json()
        })
    );

}
const GetClientByID = async (id) => {
    return await (
        fetch(`/api/users/${id}`, {
            method: 'GET',
            headers: BASIC_HEADERS
        }).then(response => {
            return response.json()
        })
    );


}

const GetProjectsByClientID = async (id) => {
    return await (
        fetch(`/api/users/${id}/projects`, {
            method: 'GET',
            headers: BASIC_HEADERS
        }).then(response => {
            return response.json()
        })
    );

}

const CreateNewClient = async (bodyForm) => {
    return await (
        fetch(`/api/users`, {
            method: 'POST',
            headers: BASIC_HEADERS,
            body: JSON.stringify(bodyForm)
        }).then(response => {
            return response.json()
        })
    );
}

const UpdateUser = async (bodyForm) => {
    return await (
        fetch(`/api/users`, {
            method: 'PATCH',
            headers: BASIC_HEADERS,
            body: JSON.stringify(bodyForm)
        }).then(response => {
            return response.json()
        })
    );
}


export {
    CreateNewClient,
    GetClients,
    UpdateUser,
    GetClientByID,
    GetProjectsByClientID,
    GetClientsWithProjects
}
