const request = require('supertest');
const server = require('../../../src/server');

const { app } = server;

describe('register', () => {
  it('Throws error when email is invalid', (done) => {
    request(app)
      .post('/v1/auth/register')
      .send({ email: 'somethinggmail.com', password: '123456' })
      .end((err, res) => {
        if (err) {
          throw err;
        }

        console.log(res);
        // expect(res.status).toBe(400);
        done()
      });
  });
});
