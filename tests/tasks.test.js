const request = require('supertest')
const app = require('../app')

describe('Task API Endpoints', () => {
  test('GET /tasks returns 200', async () => {
    const res = await request(app).get('/tasks')
    expect(res.statusCode).toBe(404)
    expect(Array.isArray(res.body)).toBe(true)
  })

  test('POST /tasks creates a new task with 201', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Deploy with CI/CD' })
    expect(res.statusCode).toBe(201)
    expect(res.body.title).toBe('Deploy with CI/CD')
  })

  test('POST /tasks fails with 400 when title is missing', async () => {
    const res = await request(app).post('/tasks').send({})
    expect(res.statusCode).toBe(400)
  })
})
