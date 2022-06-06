const {validateCreateUserBody} = require('../../controllers/person')
const {validateUpdateBody} = require('../../controllers/project')
var httpMocks = require('node-mocks-http');
var assert = require('assert');

test('Unit test create person without body ', async () => {
    let request  = undefined
    assert.equal(validateCreateUserBody(request), false)
})

test('Unit test create person with country ', async () => {
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
test('Unit test create person without country ', async () => {
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

test('Unit test create person without postalCode ', async () => {
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
test('Unit test create person without street ', async () => {
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
test('Unit test create person without locality', async () => {
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

test('Unit test create person with invalid mobile', async () => {
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

test('Unit test modify person with correct body ', async () => {
    let request  = httpMocks.createRequest({
        body: {
            'id': 10,
            'name': 'Test with chai',
            'status': 'Pre-Sale',
            'start_date': new Date(),
            'end_date':  new Date(),
            
        }
    });

    assert.equal(validateUpdateBody(request.body), true)
    
})