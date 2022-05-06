const {validateCreateUserBody} = require('../../controllers/person')
var httpMocks = require('node-mocks-http');
var assert = require('assert');

test('Unit test create user without body ', async () => {
    let request  = undefined
    assert.equal(validateCreateUserBody(request), false)
})

test('Unit test create user with country ', async () => {
    let request  = httpMocks.createRequest({
        body: {
            
            'firstName': 'Toto',
            'lastName': 'Pierre',
            'email': 'toto.pierre@gmail.com',
            'vta': null,
            'mobile': '+32488679560',
            'street': 'Rue Bisse',
            'locality': 'Bruxelles',
            'postalCode': '1000',
            'country': 'Belgium'
        }
    });
    assert.equal(validateCreateUserBody(request.body), true)
    
})
test('Unit test create user without country ', async () => {
    let request  = httpMocks.createRequest({
        body: {
            
            'firstName': 'Toto',
            'lastName': 'Pierre',
            'email': 'toto.pierre@gmail.com',
            'vta': null,
            'mobile': '+32488679560',
            'street': 'Rue Bisse',
            'locality': 'Bruxelles',
            'postalCode': '1000'
        }
    });
    assert.equal(validateCreateUserBody(request.body), false)
})

test('Unit test create user without postalCode ', async () => {
    let request  = httpMocks.createRequest({
        body: {
            
            'firstName': 'Toto',
            'lastName': 'Pierre',
            'email': 'toto.pierre@gmail.com',
            'vta': null,
            'mobile': '+32488679560',
            'street': 'Rue Bisse',
            'locality': 'Bruxelles',
        }
    });
    assert.equal(validateCreateUserBody(request.body), false)
})
test('Unit test create user without street ', async () => {
    let request  = httpMocks.createRequest({
        body: {
            
            'firstName': 'Toto',
            'lastName': 'Pierre',
            'email': 'toto.pierre@gmail.com',
            'vta': null,
            'mobile': '+32488679560',
            'locality': 'Bruxelles',
        }
    });
    assert.equal(validateCreateUserBody(request.body), false)
})
test('Unit test create user without locality', async () => {
    let request  = httpMocks.createRequest({
        body: {
            
            'firstName': 'Toto',
            'lastName': 'Pierre',
            'email': 'toto.pierre@gmail.com',
            'vta': null,
            'mobile': '+32488679560',
        }
    });
    assert.equal(validateCreateUserBody(request.body), false)
})

test('Unit test create user with invalid mobile', async () => {
    let request  = httpMocks.createRequest({
        body: {
            
            'firstName': 'Toto',
            'lastName': 'Pierre',
            'email': 'toto.pierre@gmail.com',
            'vta': null,
            'mobile': '+32488bbbbb69560',
            'street': 'Rue Bisse',
            'locality': 'Bruxelles',
            'postalCode': '1000',
            'country': 'Belgium'
        }
    });
    assert.equal(validateCreateUserBody(request.body), false)
})