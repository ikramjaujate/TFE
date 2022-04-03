const BASIC_HEADERS = { 
    'Content-Type': 'application/json',
    'Authorization': "Bearer " + localStorage.getItem('access_token')
}

const PDF_HEADERS = { 
    'Content-Type': 'application/pdf',
    'Authorization': "Bearer " + localStorage.getItem('access_token')
}


export  {
    BASIC_HEADERS,
    PDF_HEADERS
}