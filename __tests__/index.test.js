const request = require('supertest');

const router = require('../routes/index.js');

const express = require('express');

const url = 'http://localhost:8080'

const server = new express();

server.use('/', router);




describe('Good Home Routes', function () {




  test('responds to /cart', async () => {

    const res = await request(url).get('/cart').expect(200)

  });

  //get specific

  id = '649e5f95378460085c99f899'

  test('responds to /cart', async () => {

    const res = await request(url).get('/cart/' + id).expect(200)

  });




 

  test('responds to /cart', async () => {

  const payload = {

    orderItem : 'hair tie',

    productDetail : 'a scrunchie to tie hair',

    dateAdded : '10/10/23'

  }

    const res = await request(url).post('/cart').send(payload).expect(201)




    id = res.text.split(":")[2].replace('"',"").replace("}","").replace('"',"")

  });




  test('responds to /cart', async () => {

    const payload = {

      orderItem : 'hair tie',

      productDetail : 'tie for the hair',

      dateAdded : '10/10/23'

    }

      const res = await request(url).put('/cart/'+id).send(payload).expect(204)

    });




  test('responds to /cart', async () => {

        const res = await request(url).delete('/cart/'+id).expect(200)

      });

  /*

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

*/

});