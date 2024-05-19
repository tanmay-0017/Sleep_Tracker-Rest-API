import { expect } from 'chai';
import { app } from '../index.js';
import { promises as fs } from 'fs';
import request from 'supertest';

describe('API Endpoints', () => {

    describe('GET /', () => {
        it('should return Hello World', (done) => {
            request(app)
                .get('/')
                .end((err, res) => {
                    // expect(res).to.have.status(200);
                    expect(res.status).to.equal(200)
                    expect(res.text).to.equal('Hello World!');
                    done();
                });
        });
    });

    describe('POST /sleep', () => {
        it('should add a new sleep entry', (done) => {
            const newEntry = { id: 5, hours: 7 };
            request(app)
                .post('/sleep')
                .send(newEntry)
                .end(async (err, res) => {
                    // expect(res).to.have.status(200);
                    expect(res.status).to.equal(200);
                    expect(res.body).to.include(newEntry);
                    const data = await fs.readFile('data.json', 'utf-8');
                    const users = JSON.parse(data);
                    expect(users).to.deep.include({
                        id: 5,
                        hours: 7,
                        timestamp: res.body.timestamp
                    });
                    done();
                });
        });

        it('should return an error if id or hours are missing', (done) => {
            request(app)
                .post('/sleep')
                .send({ id: 13 })
                .end((err, res) => {
                    // expect(res).to.have.status(400);
                    expect(res.status).to.equal(400);
                    done();
                });
        });
    });

    describe('GET /sleep/:id', () => {
        it('should return sorted sleep entries by id', (done) => {
            request(app)
                .get('/sleep/12')
                .end((err, res) => {
                    // expect(res).to.have.status(200);
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('array').that.is.not.empty;
                    expect(res.body).to.deep.equal([
                        { id: 12, hours: 8, timestamp: 1716070974887 },
                        { id: 12, hours: 7, timestamp: 1716071036594 }
                    ]);
                    done();
                });
        });

        it('should return 404 if the entry does not exist', (done) => {
            request(app)
                .get('/sleep/99')
                .end((err, res) => {
                    // expect(res).to.have.status(404);
                    expect(res.status).to.equal(404);
                    done();
                });
        });
    });

    describe('DELETE /sleep/:id', () => {
        it('should delete a sleep entry by id', (done) => {
            request(app)
                .delete('/sleep/5')
                .end(async (err, res) => {
                    // expect(res).to.have.status(302);
                    expect(res.status).to.equal(302);
                    const data = await fs.readFile('data.json', 'utf-8');
                    const users = JSON.parse(data);
                    expect(users).to.not.deep.include({
                        id: 5,
                        hours: 6,
                        timestamp: 1716071036594
                    });
                    done();
                });
        });

        it('should return 404 if the entry to delete does not exist', (done) => {
            request(app)
                .delete('/sleep/99')
                .end((err, res) => {
                    // expect(res).to.have.status(404);
                    expect(res.status).to.equal(404);
                    done();
                });
        });
    });
});












// (async () => {
//     const chai = require('chai')
//     const chaiHttp = require('chai-http')
//     const fs = require('fs').promises;
//     const app = require('../index');
//     const { expect } = chai;

//     chai.use(chaiHttp);

//     describe('API Endpoints', () => {
//         beforeEach(async () => {
//             // Reset data.json before each test
//             const users = await fs.readFile('data.json', 'utf-8');
//         })
        
//         describe('GET /', () => {
//             it ('should return Hello World', (done) => {
//                 chai.request(app)
//                     .get('/')
//                     .end((err, res) => {
//                         expect(res).to.have.status(200);
//                         expect(res.text).to.equal("Hello World");
//                         done();
//                     })
//             })
//         })

//         describe('POST /sleep', () => {
//             it ('should add a new sleep entry', (done) => {
//                 const newEntry = {
//                     "id" : 13,
//                     "hours" : 7
//                 }
//                 chai.request(app)
//                     .post('/sleep')
//                     .send(newEntry)
//                     .end(async (err, res) => {
//                         expect(res).to.have.status(200);
//                         expect(res.body).to.include(newEntry);
//                         const users = await fs.readFile('data.json', 'utf-8');
//                         const user = JSON.parse(users);
//                         expect(user).to.deep.include({
//                             "id" : 13, 
//                             "hours" : 7,
//                             "timestamp" : res.body.timestamp
//                         })
//                         done();
//                     })
//             })
//             it('should return an error if id or hours are missing', (done) => {
//                 chai.request(app)
//                     .post('/sleep')
//                     .send({id : 13})
//                     .end((err, res) => {
//                         expect(res).to.have.status(400);
//                         done();
//                     })
//             })
//         })

//         describe('GET /sleep/:id', () => {
//             it ('should return a sleep entry by id', (done) => {
//                 chai.request(app)
//                     .get('/sleep/12')
//                     .end((err, res) => {
//                         expect(res).to.have.status(200);
//                         expect(res.body).to.deep.equal({
//                             "id" : 12,
//                             hours : 8, 
//                             timestamp : 1716070974887
//                         })
//                         done();
//                     })
//             })
//             it('should return 404 if the entry does not exist', (done) => {
//                 chai.request(app)
//                     .get('/sleep/99')
//                     .end((err, res) => {
//                         expect(res).to.have.status(404);
//                         done();
//                     });
//             });
//         })

//         describe('DELETE /sleep/:id', () => {
//             it ('should delete a sleep entry by id', (done) => {
//                 chai.request(app)
//                     .delete('/sleep/5')
//                     .end((err, res) => {
//                         expect(res).to.have.status(200);
//                         const users = fs.readFile('data.json', 'utf-8');
//                         const user = JSON.parse(users);
//                         expect(user).to.not.deep.include({
//                             "id": 5,
//                             "hours": 6,
//                             "timestamp": 1716071036594
//                         })
//                         done();
//                     })
//             })
//             it('should return 404 if the entry to delete does not exist', (done) => {
//                 chai.request(app)
//                     .delete('/sleep/99')
//                     .end((err, res) => {
//                         expect(res).to.have.status(404);
//                         done();
//                     });
//             });
//         })
//     })
// })()
