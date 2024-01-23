const request = require('supertest');
const app = require('../app'); // Importe seu app Express

describe('Teste da rota POST /calculate-route', () => {
  test('Deve responder com um status 200 e um objeto de rota', async () => {
    const response = await request(app)
      .post('/calculate-route')
      .send({ positions: ['A1', 'C3', 'F6'] });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('route');
  });

  
});
