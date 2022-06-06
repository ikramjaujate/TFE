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

test('Unit test modify project with incorrect body ', async () => {
    let request  = httpMocks.createRequest({
        body: {
            'id': null,
            'name': null,
            'status': 'Pre-Sale',
            'start_date': new Date(),
            'end_date':  new Date(),
            
        }
    });
    assert.throws(function() { validateUpdateBody(request.body) }, Error, /No project id/);

})

test('Unit test modify project without id ', async () => {
    let request  = httpMocks.createRequest({
        body: {
            'id': null,
            'name': 'Test with chai',
            'status': 'Pre-Sale',
            'start_date': new Date(),
            'end_date':  new Date(),
            
        }
    });
    assert.throws(function() { validateUpdateBody(request.body) }, Error, /No project id/);

})

test('Unit test modify project without name ', async () => {
    let request  = httpMocks.createRequest({
        body: {
            'id': 12,
            'name': null,
            'status': 'Pre-Sale',
            'start_date': new Date(),
            'end_date':  new Date(),
            
        }
    });
    assert.throws(function() { validateUpdateBody(request.body) }, Error, /No name/);

})

test('Unit test modify project without incorrect name ', async () => {
    let request  = httpMocks.createRequest({
        body: {
            'id': 12,
            'name': "",
            'status': 'Pre-Sale',
            'start_date': new Date(),
            'end_date':  new Date(),
            
        }
    });
    assert.throws(function() { validateUpdateBody(request.body) }, Error, /No name/);

})

test('Unit test modify project without status ', async () => {
    let request  = httpMocks.createRequest({
        body: {
            'id': 12,
            'name': "test",
            'status': null,
            'start_date': new Date(),
            'end_date':  new Date(),
            
        }
    });
    assert.throws(function() { validateUpdateBody(request.body) }, Error, /No status or invalid status/);

})

test('Unit test modify project with incorrect status ', async () => {
    let request  = httpMocks.createRequest({
        body: {
            'id': 12,
            'name': "test",
            'status': 'Fini',
            'start_date': new Date(),
            'end_date':  new Date(),
            
        }
    });
    assert.throws(function() { validateUpdateBody(request.body) }, Error, /No status or invalid status/);

})

test('Unit test modify project without start_date ', async () => {
    let request  = httpMocks.createRequest({
        body: {
            'id': 12,
            'name': "test",
            'status': 'Pre-Sale',
            'start_date': null,
            'end_date':  new Date(),
            
        }
    });
    assert.throws(function() { validateUpdateBody(request.body) }, Error, /No start date/);

})

test('Unit test modify project without end_date ', async () => {
    let request  = httpMocks.createRequest({
        body: {
            'id': 12,
            'name': "test",
            'status': 'Pre-Sale',
            'start_date': new Date(),
            'end_date':  null
            
        }
    });
    assert.throws(function() { validateUpdateBody(request.body) }, Error, /No end date/);

})
test('Unit test project with correct body ', async () => {
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
test('Unit test modify project with start_date > end_date ', async () => {
    var end = new Date();

    // add a day
    end.setDate(end.getDate() + 1);
    let request  = httpMocks.createRequest({
        body: {
            'id': 12,
            'name': "test",
            'status': 'Pre-Sale',
            'start_date': end,
            'end_date':  new Date()
            
        }
    });
    assert.throws(function() { validateUpdateBody(request.body) }, Error, /Invalid date/);

})