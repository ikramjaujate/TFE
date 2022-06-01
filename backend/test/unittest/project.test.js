const {validateUpdateBody} = require('../../controllers/project')
var httpMocks = require('node-mocks-http');
var assert = require('assert');

test('Unit test modify project without body ', async () => {
    let request  = undefined
    assert.equal(validateUpdateBody(request), false)
})

test('Unit test modify project with correct body ', async () => {
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