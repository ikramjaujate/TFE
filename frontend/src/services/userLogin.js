import { BASIC_HEADERS } from "../shared/consts/headers";

const GetUsers = async () => {
    return await (
        fetch(`/api/users`, {
            method: 'GET',
            headers: BASIC_HEADERS
        }).then(response => {
            return response.json()
        })
    );
}

const CreateNewUser = async (bodyForm) => {
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
export {
    GetUsers,
    CreateNewUser
}