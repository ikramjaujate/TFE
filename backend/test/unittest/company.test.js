const {validateCreateCompanyBody} = require('../../controllers/company')
var httpMocks = require('node-mocks-http');
var assert = require('assert');

test('Unit test create company without body ', async () => {
    let request  = undefined
    assert.equal(validateCreateCompanyBody(request), false)
})

test('Unit test create company with vta ', async () => {
    let request  = httpMocks.createRequest({
        body: {
            
            'name': 'Toto a faim',
            'email': 'toto.pierre@gmail.com',
            'vta': 'BE 3456788',
            'mobile': '+32488679560',
            'street': 'Rue Bisse',
            'locality': 'Bruxelles',
            'postalCode': '1000',
            'country': 'Belgium'
        }
    });
    assert.equal(validateCreateCompanyBody(request.body), true)
    
})
test('Unit test create company without vta ', async () => {
    let request  = httpMocks.createRequest({
        body: {
            
            'name': 'Toto a faim',
            'email': 'toto.pierre@gmail.com',
            'vta': null,
        }
    });
    assert.equal(validateCreateCompanyBody(request.body), false)
})

test('Unit test create company without name ', async () => {
    let request  = httpMocks.createRequest({
        body: {
            
            'name': null,
            'email': 'toto.pierre@gmail.com',
            'vta': null,
        }
    });
    assert.equal(validateCreateCompanyBody(request.body), false)
    
})

test('Unit test create company without name and vta', async () => {
    let request  = httpMocks.createRequest({
        body: {
            
            'name': null,
            'email': 'toto.pierre@gmail.com',
            'vta': null,
        }
    });
    assert.equal(validateCreateCompanyBody(request.body), false)
    
})

test('Unit test create COMPANY with invalid mobile', async () => {
    let request  = httpMocks.createRequest({
        body: {
            
            'name': 'Toto a faim',
            'email': 'toto.pierre@gmail.com',
            'vta': 'BE 13456778',
            'mobile': '+32488bbbbb69560',
           
        }
    });
    assert.equal(validateCreateCompanyBody(request.body), false)
})