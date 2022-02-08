import chaiHttp from "chai-http";
import chai, { assert, expect } from "chai";
import { describe } from "mocha";
chai.use(chaiHttp);


describe('GET /api/users', () => {
    it('should return a list of users when called', done => {
        const res = chai.request('http://localhost:4000/api/users')
        .get('/')
        .end((err, response) => {
            expect(err).to.be.null;
            expect(response).to.have.status(200);
            // assert
            console.log(response.body);
            done();
        })
    })
})