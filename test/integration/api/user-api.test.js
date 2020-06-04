/* eslint-disable no-undef */
// not using assert and should, using only expect
const expect = require('chai').expect
const server = require('../../../server')
const request = require('supertest')(server)
const ExUser = require('../../fixtures/exUser.json')
const BadUser = require('../../fixtures/badUser.json')
const BadReview = require('../../fixtures/badReview.json')

describe('User creation API', () => {
  const user = ExUser
  it('should create user', (done) => {
    request.post('/users/new')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, response) => {
        if (err) done(err)
        expect(response.body.user).to.not.equal(null)
        expect(response.statusCode).to.equal(200)
        done()
      })
  })

  it('should not create user without values', (done) => {
    request.post('/users/new')
      .set('Accept', 'application/json')
      .send(ExUser).end((err, response) => {
        if (err) done(err)
        console.log(response.body)
        expect(response.body.msg).to.not.equal(null)
        done()
      })
  })

  it('should not create user if any of required value is missing', (done) => {
    const user = BadUser
    request.post('/users/new')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, response) => {
        if (err) done(err)
        console.log(response.body)
        expect(response.body.msg).to.not.equal(null)
        done()
      })
  })
})

describe('User functionality API', () => {
  it('should login user', (done) => {
    request.get('/users/one/Testing')
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) done(err)
        expect(response.body.user).to.not.equal(null)
        expect(response.statusCode).to.equal(200)
        done()
      })
  })

  it('should get all users', (done) => {
    request.get('/users/all')
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) done(err)
        expect(response.body.length).to.not.equal(0)
        expect(response.statusCode).to.equal(200)
        done()
      })
  })
})

describe('Hike Get API', () => {
  it('should get all hikes', (done) => {
    request.get('/list/hike/all')
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) done(err)
        expect(response.body.length).to.not.equal(0)
        expect(response.statusCode).to.equal(200)
        done()
      })
  })

  it('should get hikes of 4 difficulty', (done) => {
    request.get('/list/hike/difficulty/4')
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) done(err)
        expect(response.body.length).to.not.equal(0)
        expect(response.statusCode).to.equal(200)
        done()
      })
  })

  it('should get hikes of 4 rating', (done) => {
    request.get('/list/hike/rating/4')
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) done(err)
        expect(response.body.length).to.not.equal(0)
        expect(response.statusCode).to.equal(200)
        done()
      })
  })

  it('should find partial names of hike "Co"', (done) => {
    request.get('/list/hike/name/Co')
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) done(err)
        expect(response.body.length).to.not.equal(0)
        expect(response.statusCode).to.equal(200)
        done()
      })
  })
})

describe('Hike Posting API', () => {
  it('should not create empty hike', (done) => {
    request.post('/list/hike/new')
      .set('Accept', 'application/json')
      .send({})
      .end((err, response) => {
        if (err) done(err)
        expect(response.body.message).to.not.equal(null)
        expect(response.statusCode).to.equal(500)
        done()
      })
  })

  it('should not add empty photo', (done) => {
    request.post('/list/hike/Test/photo/add')
      .set('Accept', 'application/json')
      .send({})
      .end((err, response) => {
        if (err) done(err)
        expect(response.body.message).to.not.equal(null)
        expect(response.statusCode).to.equal(500)
        done()
      })
  })

  it('should not add bad review', (done) => {
    request.post('/list/hike/Test/photo/add')
      .set('Accept', 'application/json')
      .send(BadReview)
      .end((err, response) => {
        if (err) done(err)
        expect(response.body.message).to.not.equal(null)
        expect(response.statusCode).to.equal(500)
        done()
      })
  })
})

describe('Location API', () => {
  it('should show all locations', (done) => {
    request.get('/list/location/all')
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) done(err)
        expect(response.body.length).to.not.equal(0)
        expect(response.statusCode).to.equal(200)
        done()
      })
  })

  it('should show all locations with detail', (done) => {
    request.get('/list/location/all/detail')
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) done(err)
        expect(response.body.length).to.not.equal(0)
        expect(response.statusCode).to.equal(200)
        done()
      })
  })

  it('should show reservoir canyon detail', (done) => {
    request.get('/list/location/5ed71c83ee2335002471ee8e/Hike')
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) done(err)
        expect(response.body.name).to.equal('Reservoir Canyon')
        expect(response.statusCode).to.equal(200)
        done()
      })
  })

  it('should show reservoir canyon detail', (done) => {
    request.get('/list/location/5ed71c83ee2335002471ee8e/Hike')
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) done(err)
        expect(response.body.name).to.equal('Reservoir Canyon')
        const body = { reviewIds: response.body._reviews }
        request.post('/list/review')
          .set('Accept', 'application/json')
          .send(body)
          .end((err, response) => {
            if (err) done(err)
            expect(response.body.length).to.not.equal(0)
            expect(response.statusCode).to.equal(200)
            done()
          })
      })
  })
})
