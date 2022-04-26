import { BASIC_HEADERS } from "../shared/consts/headers";

const GetClients = async () => {
    return await (
        fetch(`/api/persons`, {
            method: 'GET',
            headers: BASIC_HEADERS
        }).then(response => {
            return response.json()
        })
    );
}

const GetClientsWithProjects = async () => {
    return await (
        fetch(`/api/simple-persons`, {
            method: 'GET',
            headers: BASIC_HEADERS
        }).then(response => {
            return response.json()
        })
    );

}
const GetClientByID = async (id) => {
    return await (
        fetch(`/api/persons/${id}`, {
            method: 'GET',
            headers: BASIC_HEADERS
        }).then(response => {
            return response.json()
        })
    );


}

const GetProjectsByClientID = async (id) => {
    return await (
        fetch(`/api/persons/${id}/projects`, {
            method: 'GET',
            headers: BASIC_HEADERS
        }).then(response => {
            return response.json()
        })
    );

}

const CreateNewClient = async (bodyForm) => {
    return await (
        fetch(`/api/persons`, {
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
        fetch(`/api/persons`, {
            method: 'PATCH',
            headers: BASIC_HEADERS,
            body: JSON.stringify(bodyForm)
        }).then(response => {
            return response.json()
        })
    );
}

const DeleteUser = async (bodyForm) => {
    return await (
        fetch(`/api/persons`, {
            method: 'DELETE',
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
    GetClientsWithProjects,
    DeleteUser
}
