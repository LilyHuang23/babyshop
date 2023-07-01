import request from 'supertest';
import express from 'express';
import router from '../routes/index.js';

const server = new express();
server.use('/', router);

describe('Good Home Routes', function () {

  test('responds to /', async () => {
    const res = await request(server).get('/cart');
    expect(res.statusCode).toBe(200);
  });
  
  test('responds to /hello/:name', async () => {
    const res = await request(server).get('/hello/jaxnode'); 
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual('hello jaxnode!');
  });

  test('responds to /hello/Annie', async () => {
    const res = await request(server).get('/hello/Annie'); 
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual('hello Annie!');
  });

});