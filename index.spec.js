const request = require('supertest');
const should = require('should');
const app = require('./index');

describe('GET /users is', ()=>{
    describe('Success', ()=>{
        it('Response with user object Array ',(done)=>{
            request(app)
                .get('/users')
                .end((err,res)=> {
                    res.body.should.be.instanceOf(Array);
                    done();
                });
        });
    
        it('Response with Max Limit numbers', (done) => {
            request(app)
            .get('/users?limit=2')
            .end((err, res) => {
                res.body.should.have.lengthOf(2)
                done();
            })
        });

    });

    describe('On Faillure', () => {
        it('If limit is not number assign 400', (done)=>{
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done);
        })
    })
})

describe('GET /users/1 is', ()=> {
    describe('Success is', ()=>{
        it('Return id:1 Obejct', (done)=>{
            request(app)
                .get('/users/1')
                .end((err,res) => {
                    res.body.should.have.property('id', 1);
                    done();
                });
        })
    })

    describe('Faillure', ()=>{
        it('If id is not number assign 400', (done)=>{
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done);
        })
        it('If id not found assign 404', (done)=>{
            request(app)
                .get('/users/5')
                .expect(404)
                .end(done);
        })


    })

})

describe('DELETE /users/1 ', ()=> {
    describe('Success is', ()=>{
        it('Response with 204', (done)=>{
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done);
        })
    })

    describe('Faillure', ()=>{
        it('If id is not number assign 400', (done)=>{
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done);
        })
    })

})

describe('POST /users', () => {
    describe('Success', () => {
        let name ='daniel',
            body;
        before(done=>{
            request(app)
            .post('/users')
            .send({name:'daniel'})
            .expect(201)
            .end((err, res)=> {
                body = res.body;
                done();
            })
        })
    it('Return created User object', ()=> {
        body.should.have.property('id');
    });
    it('Return name', ()=>{
        body.should.have.property('name',name);
    })
    });

    describe('Faillure', ()=>{
        it('If name parameters missing return 400', (done)=>{
            request(app)
            .post('/users')
            .send({})
            .expect(400)
            .end(done)
        })
        it('If have same name return 409', (done)=>{
            request(app)
                .post('/users')
                .send({name:'daniel'})
                .expect(409)
                .end(done)
        })

    })


})


describe('PUT /users/:id', () => {
    describe('Success', () => {
        it('on sucess return name', (done)=>{
            const name ='drake';
            request(app)
            .put('/users/3')
            .send({name})
            .end((err, res)=> {
                res.body.should.have.property('name', name);
                done();
            });
        })
    })

    describe('Faillure', ()=>{
        it('If id is not int 400', (done)=>{
            request(app)
            .put('/users/one')
            .expect(400)
            .end(done)
        })

        it('If name parameters missing return 400', (done)=>{
            request(app)
            .put('/users/1')
            .send({})
            .expect(400)
            .end(done)
        })
        it('If have same name return 409', (done)=>{
            request(app)
                .put('/users/2')
                .send({name:'test2'})
                .expect(409)
                .end(done)
        })
        it('If no name found return 404', (done)=>{
            request(app)
            .put('/users/123')
            .send({name:'foo'})
            .expect(404)
            .end(done)
        })

    })


})