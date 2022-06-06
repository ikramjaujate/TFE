import { BASIC_HEADERS } from "../shared/consts/headers";
import Dexie from 'dexie';

let db = new Dexie('MyDatabase');


db.version(1).stores({
    cache: '++id, key, lastUpdatedAt'
});

const databaseCreation = () => {
    db = new Dexie('MyDatabase');


    db.version(1).stores({
        cache: '++id, key, lastUpdatedAt'
    });
}

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
const GetMaterialChanges = async (id) => {
    return await (
        fetch(`/api/material-history/${id}`, {
            method: 'GET',
            headers: BASIC_HEADERS
        }).then(res => {
            return res.json()
        })
    );
}

const GetMaterialWasUpdated = async () => {
    return await (
        fetch(`/api/materials/last-updated-at`, {
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

    const [stockLastUpdatedAt, cacheMaterials] = await Promise.all([
         GetMaterialWasUpdated().then(res => {
            return new Date(res.lastUpdatedAt)
        }),
        db.cache.where('key').equals('materials').first()
    ])

    let cacheLastUpdatedAt = new Date('1900-01-01')

    if(cacheMaterials && cacheMaterials.lastUpdatedAt ){
        cacheLastUpdatedAt = new Date(cacheMaterials.lastUpdatedAt)
    }

    
    if(stockLastUpdatedAt < cacheLastUpdatedAt){
        const cache = await db.cache.where('key').equals('materials').first()
        if(cache){
            return cache.data
        }    
    }
    return await (
        fetch(`/api/materials/stock-status`, {
            method: 'GET',
            headers: BASIC_HEADERS
        }).then(async(res) => {
            const data = await res.json()
            
            await db.cache.where('key').equals('materials').delete()
            db.cache.add({key: 'materials', data: data, lastUpdatedAt: new Date()})

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
    GetMaterialWasUpdated,
    GetMaterialChanges,
    databaseCreation
}