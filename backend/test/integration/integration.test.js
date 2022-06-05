const assert = require("assert");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();
var request = require("supertest");
const { TOKEN_TEST } = process.env;
chai.use(chaiHttp);
request = request("http://localhost:3001");

describe('GET /api/persons', function() {
    it('should fetch all clients successfully', function(done) {
        chai.request(server)
        .get('/api/persons')
        .set({ Authorization: `Bearer ${TOKEN_TEST}` })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('users')
            res.body.users.should.be.a('array');
            res.body.users[0].should.have.property('firstName')
            done();
        })
    });
})

describe('GET /api/persons/2', function() {
    it('should get only the first client successfully', function(done) {
        chai.request(server)
        .get('/api/persons/2')
        .set({ Authorization: `Bearer ${TOKEN_TEST}` })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('user')
            res.body.user.should.be.a('array');
            res.body.user[0].should.have.property('firstName')
            res.body.user[0].firstName.should.be.eql('Görel')
            res.body.user[0].lastName.should.be.eql('MacFadin')
            res.body.user[0].email.should.be.eql('görel.macfadin@hotmail.com')
            done();
        })
    });
})

describe('GET /api/materials', function() {
    it('should fetch all materials successfully', function(done) {
        chai.request(server)
        .get('/api/materials')
        .set({ Authorization: `Bearer ${TOKEN_TEST}` })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('materials')
            res.body.materials.should.be.a('array');
            done();
        })
    });
})

describe('GET /api/materials/1', function() {
    it('should fetch the first material successfully', function(done) {
        chai.request(server)
        .get('/api/materials')
        .set({ Authorization: `Bearer ${TOKEN_TEST}` })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('materials')
            res.body.materials.should.be.a('array');
            res.body.materials[0].should.have.property('type')
            res.body.materials[0].name.should.be.eql('Brick Pavers')
            res.body.materials[0].price.should.be.eql(4.51)
            res.body.materials[0].quantity.should.be.eql(3)
            done();
        })
    });
})

describe('PATCH /api/persons/1', function() {
    it("should update the client with the id 1", function(done) {
        let member = {
            id : 1,
           email : "test@chaitest.com",
           country: 'Belgium',
            firstName: 'Almérinda',
            lastName: 'Facchini',
            vta: null,
            mobile: '+32 471354661',
            phone: null,
            street: 'Rue test',
            locality: 'Bruxelles',
            postalCode: 1234,
        
            isActive: true,


        }
        chai.request(server)
        .patch('/api/persons')
        .set({ Authorization: `Bearer ${TOKEN_TEST}` })
        .send(member)
        .end((err, res) => {

            res.should.have.status(200);
            res.body.user.email.should.be.eql('test@chaitest.com')
            res.body.should.be.a('object');
            
            done();
        })
    });
})

describe('PATCH /api/persons/1', function() {
    it("should update the client with the id 1", function(done) {
        let member = {
            id : 1,
           email : "görel.macfadin@hotmail.com",
           country: 'Belgium',
            firstName: 'Almérinda',
            lastName: 'Facchini',
            vta: null,
            mobile: '+32 471354661',
            phone: null,
            street: 'Rue test',
            locality: 'Bruxelles',
            postalCode: 1234,
        
            isActive: true,

        }
        chai.request(server)
        .patch('/api/persons')
        .set({ Authorization: `Bearer ${TOKEN_TEST}` })
        .send(member)
        .end((err, res) => {

            res.should.have.status(500);
            
            res.error.should.have.property('text')
            res.error.text.should.be.eql('Email already taken')
            done();
        })
    });
})

describe('DELETE /api/persons/1', function() {
    it("should update the status of the client with the id 1", function(done) {
        let member = {
            id : 1,
            isActive: false,


        }
        chai.request(server)
        .delete('/api/persons')
        .set({ Authorization: `Bearer ${TOKEN_TEST}` })
        .send(member)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.user.isActive.should.be.eql(false)
            res.body.should.be.a('object');
            done();
        })
    });
})

describe('DELETE /api/persons/1', function() {
    it("Catch error if no correct body", function(done) {
        let member = {

        }
        chai.request(server)
        .delete('/api/persons')
        .set({ Authorization: `Bearer ${TOKEN_TEST}` })
        .send(member)
        .end((err, res) => {
            res.should.have.status(500);
            done();
        })
    });
})

describe('CREATE /api/users', function() {
    it("Create new user", function(done) {
        let member = {
            firstName: 'Test',
            lastName: 'Chai',
            email: 'ttttt@chai.com',
            password: 'testchai',
            role: 'dev'
        }
        chai.request(server)
        .post('/api/users')
        .set({ Authorization: `Bearer ${TOKEN_TEST}` })
        .send(member)
        .end((err, res) => {
            res.should.have.status(201);
            res.body.newUser.password.should.not.eql('testchai')
            done();
        })
    });
})

describe('GET /api/projects', function() {
    it('should fetch all projects successfully', function(done) {
        chai.request(server)
        .get('/api/projects')
        .set({ Authorization: `Bearer ${TOKEN_TEST}` })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('projects')
            res.body.projects.should.be.a('array');
            done();
        })
    });
})

describe('GET /api/projects/id', function() {
    it('should fetch a project by id successfully', function(done) {
        chai.request(server)
        .get('/api/projects/1')
        .set({ Authorization: `Bearer ${TOKEN_TEST}` })
        .end((err, res) => {
            res.should.have.status(200);
            
            res.body.should.have.property('project')
            
            res.body.project.should.be.a('array');
            done();
        })
    });
})



describe('GET /api/projects/id/project-materials', function() {
    it('should fetch all projects-materials by project id successfully', function(done) {
        chai.request(server)
        .get('/api/projects/1/project-materials')
        .set({ Authorization: `Bearer ${TOKEN_TEST}` })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('projectMaterials')
            
            res.body.projectMaterials.should.be.a('array');
            done();
        })
    });
})



describe('GET /api/simple-project/id', function() {
    it('should fetch a project by id successfully', function(done) {
        chai.request(server)
        .get('/api/simple-project/1')
        .set({ Authorization: `Bearer ${TOKEN_TEST}` })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('project')     
            res.body.project.should.be.a('object');
            res.body.project.status.should.be.eql('Pre-Sale')
            done();
        })
    });
})

describe('GET /api/users', function() {
    it('should fetch all users successfully', function(done) {
        chai.request(server)
        .get('/api/users')
        .set({ Authorization: `Bearer ${TOKEN_TEST}` })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('usersAccount')     
            res.body.usersAccount.should.be.a('array');
            done();
        })
    });
})

describe('GET /api/project-materials', function() {
    it('should fetch all project-materials successfully', function(done) {
        chai.request(server)
        .get('/api/project-materials')
        .set({ Authorization: `Bearer ${TOKEN_TEST}` })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('projectMaterials')     
            res.body.projectMaterials.should.be.a('array');
            done();
        })
    });
})



describe('GET /api/project-materials/id/projects', function() {
    it('should fetch all project-materials successfully', function(done) {
        chai.request(server)
        .get('/api/project-materials')
        .set({ Authorization: `Bearer ${TOKEN_TEST}` })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('projectMaterials')     
            res.body.projectMaterials.should.be.a('array');
            done();
        })
    });
})