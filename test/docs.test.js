import request from 'supertest'
import app from '../src/app.js'

describe('/api/docs', () => {

    describe('GET /json -> Get swagger data in json format', () => {

        test('Should return success and json with swagger doc', async () => {
            const response = await request(app).get('/api/docs/json')

            expect(response.statusCode).toBe(200)
            expect(response.body.info.title).toBe('API Rest')
        })

    })
})