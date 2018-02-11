const App = require('yeps');
const error = require('yeps-error');
const chai = require('chai');
const chaiHttp = require('chai-http');
const srv = require('yeps-server');
const { resolve } = require('path');
const index = require('..');

const { expect } = chai;

chai.use(chaiHttp);
let app;
let server;

describe('YEPS static', async () => {
  beforeEach(() => {
    app = new App();
    app.then(error());
    server = srv.createHttpServer(app);
  });

  afterEach((done) => {
    server.close(done);
  });

  it('should test serving', async () => {
    let isTestFinished = false;

    app.then(index({
      root: resolve(__dirname, 'files'),
      index: 'index.html',
      url: '/',
    }));

    await chai.request(server)
      .get('/')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test serving with default parameters', async () => {
    let isTestFinished = false;

    app.then(index({
      root: resolve(__dirname, 'files'),
    }));

    await chai.request(server)
      .get('/')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test cache', async () => {
    let isTestFinished = false;

    app.then(index({
      root: resolve(__dirname, 'files'),
      index: 'index.html',
      url: '/',
    }));

    await chai.request(server)
      .get('/')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.header['surrogate-control']).to.be.equal('no-store');
        expect(res.header['cache-control']).to.be.equal('no-store, no-cache, must-revalidate, proxy-revalidate');
        expect(res.header.pragma).to.be.equal('no-cache');
        expect(res.header.expires).to.be.equal('0');
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test redirect', async () => {
    let isTestFinished = false;

    app.then(index({
      root: resolve(__dirname, 'files'),
      index: 'index.html',
      url: '/',
    }));

    await chai.request(server)
      .get('/index.html')
      .redirects(0)
      .send()
      .catch((err) => {
        expect(err).to.have.status(301);
        expect(err.response.header.location).to.be.equal('/');
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test 404', async () => {
    let isTestFinished = false;

    app.then(index({
      root: resolve(__dirname, 'files'),
      index: 'index1.html',
      url: '/',
    }));

    await chai.request(server)
      .get('/')
      .send()
      .catch((err) => {
        expect(err).to.have.status(404);
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test 404 for other request', async () => {
    let isTestFinished = false;

    app.then(index({
      root: resolve(__dirname, 'files'),
    }));

    await chai.request(server)
      .get('/some_url')
      .send()
      .catch((err) => {
        expect(err).to.have.status(404);
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test next then', async () => {
    let isTestFinished = false;
    let isNextFinished = false;

    app.then(index({
      root: resolve(__dirname, 'files'),
      index: 'index.html',
      url: '/',
    }));

    app.then(async () => {
      isNextFinished = true;
    });

    await chai.request(server)
      .get('/')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.not.be.equal('ok');
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
    expect(isNextFinished).is.false;
  });
});
