import { BASIC_HEADERS } from "../shared/consts/headers";
import Dexie from 'dexie';

const db = new Dexie('MyDatabase');

db.version(1).stores({
    cache: '++id, key'
});

const GetMaterials = async () => {
    console.log('tto')
    return await (
        fetch(`/api/materials`, {
            method: 'GET',
            headers: BASIC_HEADERS
        }).then(res => {
            return res.json()
        })
    );
}

const GetMaterialWasUpdated = async () => {
    return await (
        fetch(`/api/material-was-updated`, {
            method: 'GET',
            headers: BASIC_HEADERS
        }).then(res => {
            return res.json()
        })
    );
}


const GetMaterialById = async (id) => {
    return await (
        fetch(`/api/materials/${id}`, {
            method: 'GET',
            headers: BASIC_HEADERS
        }).then(response => {
            return response.json()
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

const GetStockStatus = async () => {
    const stockHasBeenUpdated = await GetMaterialWasUpdated().then(res => {
        return res.result
    })
    if(!stockHasBeenUpdated){
        const cache = await db.cache.where('key').equals('materials').first()
        if(cache){
            return cache.data
        }    
    }
    return await (
        fetch(`/api/stock-status`, {
            method: 'GET',
            headers: BASIC_HEADERS
        }).then(async(res) => {
            const data = await res.json()
            console.log(data)
            await db.cache.where('key').equals('materials').delete()
            db.cache.add({key: 'materials', data: data})

            return data
        })
    );
}
export {
    GetMaterials,
    CreateMaterial,
    UpdateMaterial,
    GetStockStatus,
    GetMaterialById,
    GetMaterialWasUpdated
}