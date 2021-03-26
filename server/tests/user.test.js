import { expect } from 'chai';
import request from 'supertest';
// import permissions from '../config/permission';
import app from '../index';

describe('User API endpoints intgeration Tests', () => {
  // const user = {
  //   user: {
  //     username: 'test-name',
  //     password: 'password1234',
  //     email: 'dent4reanltt@gmail.com',
  //     role: '5b4fafca821cf474ccf0a221',
  //     phone_number: '08169086013',
  //     permissions: [permissions.GLOBAL_USER]
  //   }
  // };

  // const login = {
  //   user: {
  //     email: 'dent4real@yahoo.com',
  //     password: 'superduperpassword',
  //   }
  // };

  // let token = '';

  // const update = {
  //   user: {
  //     username: 'recent-name'
  //   }
  // };

  // describe('#POST / user/login', () => {
  //   it('should log a user in', (done) => {
  //     request(app).post('/apis/v1/user/login').send(login)
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         expect(res.statusCode).to.equal(200);
  //         expect(res.body).to.be.an('object');
  //         expect(res.body.payload).to.be.an('object');
  //         expect(res.body.responseCode).to.equal(1);
  //         expect(res.body.responseText).to.equal('ok');
  //         token = `Bearer ${res.body.payload.token}`;
  //         done();
  //       });
  //   });
  // });

  describe('#GET / roles', () => {
    it('should get all roles', (done) => {
      request(app).get('/api/v1/user/roles')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data.roles).to.be.an('array');
          expect(res.body.status).to.equal(200);
          done();
        });
    });
  });

  // describe('#GET / user', () => {
  //   it('should get all users', (done) => {
  //     request(app).get('/apis/v1/user')
  //       .set('Authorization', token)
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         expect(res.statusCode).to.equal(200);
  //         expect(res.body).to.be.an('object');
  //         expect(res.body.payload).to.be.an('array');
  //         expect(res.body.responseCode).to.equal(1);
  //         expect(res.body.payload[0].role).to.be.an('object');
  //         expect(res.body.responseText).to.equal('ok');
  //         done();
  //       });
  //   });
  // });

  // describe('#POST / user', () => {
  //   it('should create a single user', (done) => {
  //     request(app).post('/apis/v1/user').send(user)
  //       .set('Authorization', token)
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         expect(res.statusCode).to.equal(200);
  //         expect(res.body).to.be.an('object');
  //         expect(res.body.payload).to.be.an('object');
  //         expect(res.body.payload.role).to.be.an('object');
  //         expect(res.body.payload.permissions).to.be.an('array');
  //         expect(res.body.responseCode).to.equal(1);
  //         expect(res.body.responseText).to.equal('ok');
  //         user.user = res.body.payload;
  //         done();
  //       });
  //   });
  // });

  // describe('#GET / user', () => {
  //   it('should get a single user', (done) => {
  //     request(app).get(`/apis/v1/user/${user.user._id}`)
  //       .set('Authorization', token)
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         expect(res.statusCode).to.equal(200);
  //         expect(res.body).to.be.an('object');
  //         expect(res.body.payload).to.be.an('object');
  //         expect(res.body.payload.role).to.be.an('object');
  //         expect(res.body.responseCode).to.equal(1);
  //         expect(res.body.payload.username).to.equal('test-name');
  //         user.user.username = 'changed name';
  //         done();
  //       });
  //   });
  // });

  // describe('#PUT / user', () => {
  //   it('should update a user', (done) => {
  //     request(app).put(`/apis/v1/user/${user.user._id}`).send(update)
  //       .set('Authorization', token)
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         expect(res.statusCode).to.equal(200);
  //         expect(res.body).to.be.an('object');
  //         expect(res.body.payload).to.be.an('object');
  //         expect(res.body.responseCode).to.equal(1);
  //         expect(res.body.responseText).to.equal('ok');
  //         done();
  //       });
  //   });
  // });

  // describe('#DELETE / user', () => {
  //   it('should get all users', (done) => {
  //     request(app).delete(`/apis/v1/user/'${user.user._id}`)
  //       .set('Authorization', token)
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         expect(res.statusCode).to.equal(200);
  //         expect(res.body).to.be.an('object');
  //         expect(res.body.payload).to.be.an('object');
  //         expect(res.body.responseCode).to.equal(1);
  //         done();
  //       });
  //   });
  // });
});