const request = require('supertest');
const should = require('should');
const app = require('./index');

describe('GET /users', () => {
    describe('Success', () => {
        it('Response array with user object', (done) => {
            request(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    done();
                });
        });

        it('Response max counts of array', (done) => {
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                    res.body.should.have.lengthOf(2)
                    done();
                });
        });
    });
    describe('Failed', () => {
        it('Response if limit is not number then 400', (done) => {
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done);
        })
    })
});


describe('GET /users/:id', () => {
    describe('Success', () => {
        it('Return user object id is 1', (done) => {
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1);
                    done();
                });
        });
    });
    describe('Failed', () => {
        it('Response 400, if id is not number', (done) => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done);
        });
        it('Response 404, if there is no exist id', (done) => {
            request(app)
                .get('/users/999')
                .expect(404)
                .end(done);
        });
    })
});

describe('DELETE /users/:id', () => {
    describe('Success', () => {
        it('Return 204', (done) => {
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done);
        });
    });
    describe('Failed', () => {
        it('Response 400, if id is not number', (done) => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done);
        });
    });
});

describe('POST /users', () => {
    describe('Success', () => {
        let name = 'daniel', body;
        before(done => {
            request(app)
                .post('/users')
                .send({ name })
                .expect(201)
                .end((err, res) => {
                    body = res.body;
                    done();
                });
        });
        it('Return user that created ', () => {
            body.should.have.property('id');
        });
        it('Return name that inserted ', () => {
            body.should.have.property('name', name);
        });
    });
    describe('Failed', () => {
        it('Response 400, if there is no parameter', (done) => {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done)
        });
        it('Response 400, if there is duplicated on name', (done) => {
            request(app)
                .post('/users')
                .send({ name: 'daniel' })
                .expect(409)
                .end(done)
        });
    });
});


describe('PUT /users/:id', () => {
    describe('Success', () => {
        it('Return modified name ', (done) => {
            let name = 'chally';
            request(app)
                .put('/users/3')
                .send({ name })
                .end((err, res) => {
                    res.body.should.have.property('name', name);
                    done();
                });
        });
    });
    describe('Failed', () => {
        it('Response 400, if id is not number', (done) => {
            request(app)
                .put('/users/one')
                .expect(400)
                .end(done)
        });
        it('Response 400, if there is no name', (done) => {
            request(app)
                .put('/users/1')
                .send({})
                .expect(400)
                .end(done);
        });
        it('Response 404, if there is no user', (done) => {
            request(app)
                .put('/users/999')
                .send({ name: 'foo' })
                .expect(404)
                .end(done);
        });
        it('Response 409, if there is duplicated on name', (done) => {
            request(app)
                .put('/users/2')
                .send({ name: 'bek' })
                .expect(409)
                .end(done);
        });
    });
});