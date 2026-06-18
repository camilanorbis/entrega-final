import request from 'supertest'
import mongoose from 'mongoose'
import app from '../src/app.js'
import AdoptionModel from '../src/model/adoption.model.js'
import { connectDB } from '../src/config/db.js'
import { config } from '../src/config/config.js'
import AdoptionDAO from '../src/dao/AdoptionDAO.js'
import { jest } from '@jest/globals'
import AdoptionService from '../src/service/adoption.service.js'

beforeAll (async () => {
    const dbUrl = config.MONGO_URL
    const testDbName = config.DB_NAME_TEST
    await connectDB(dbUrl,testDbName)
})

beforeEach (async () => {
    await AdoptionModel.deleteMany()
    await AdoptionModel.insertMany([
        {
            document: "DOC5678",
            completeName: "Juan Rodriguez",
            address: "Av. Rivera 2450",
            email: "juan.rodriguez@gmail.com",
            age: 31,
            petType: "dog",
            petPatent: "DOG125",
            petName: "Rocky",
            petAge: 4,
            adoptionDate: "2026-06-17T17:56:16.774Z"
        },
        {
            document: "DOC9012",
            completeName: "Lucia Fernandez",
            address: "Bulevar Artigas 1580",
            email: "lucia.fernandez@gmail.com",
            age: 27,
            petType: "cat",
            petPatent: "CAT563",
            petName: "Milo",
            petAge: 1,
            adoptionDate: "2026-05-14T17:56:16.774Z"
        },
        {
            document: "DOC3456",
            completeName: "Carlos Martinez",
            address: "18 de Julio 3200",
            email: "carlos.martinez@gmail.com",
            age: 45,
            petType: "dog",
            petPatent: "DOG842",
            petName: "Luna",
            petAge: 6,
            adoptionDate: "2026-05-17T17:56:16.774Z"
        },
        {
            document: "DOC7890",
            completeName: "Sofia Gomez",
            address: "Calle Brasil 987",
            email: "sofia.gomez@gmail.com",
            age: 22,
            petType: "cat",
            petPatent: "CAT214",
            petName: "Nina",
            petAge: 3,
            adoptionDate: "2026-04-15T17:56:16.774Z"
        },
        {
            document: "DOC1122",
            completeName: "Martin Silva",
            address: "Rambla Republica de Chile 456",
            email: "martin.silva@gmail.com",
            age: 38,
            petType: "dog",
            petPatent: "DOG991",
            petName: "Toby",
            petAge: 2,
            adoptionDate: "2026-03-21T17:56:16.774Z"
        }
    ])
})

afterAll (async () => {
    await AdoptionModel.deleteMany()
    await mongoose.connection.close()
})

afterEach (async () => {
    jest.restoreAllMocks()
})

describe('/api/adoption', () => {

    describe('GET / -> List all adoption registries', () => {
        
        test('Should return status 200 and an array of adoption registries', async () => {
            const response = await request(app).get('/api/adoption')

            expect(response.statusCode).toBe(200)
            expect(response.body.status).toBe('success')
            expect(Array.isArray(response.body.payload)).toBe(true)
            expect(response.body.payload.length).toBe(5)
        })

        test('Should return 500 when database fails', async () => {
            jest.spyOn(AdoptionDAO.prototype, 'getAdoptions').mockRejectedValue(new Error('Database connection failed'))
            const response = await request(app).get('/api/adoption')
            
            expect(response.statusCode).toBe(500)
            expect(response.body.status).toBe('error')
            expect(response.body.message).toBe('Database connection failed')
        })

    })

    describe('GET /:id -> Find an adoption registry by id', () => {

        test('Should return an existing adoption registry', async () => {
            const adoption = await AdoptionModel.findOne({ document: 'DOC1122' }).lean()
            const response = await request(app).get(`/api/adoption/${adoption._id}`)

            expect(response.statusCode).toBe(200)
            expect(response.body.status).toBe('success')
            expect(response.body.payload).toBeDefined()
            expect(response.body.payload._id).toBe(adoption._id.toString())
            expect(response.body.payload.document).toBe('DOC1122')
        })

        test('Should return 404 error', async () => {
            const fakeID = new mongoose.Types.ObjectId()
            const response = await request(app).get(`/api/adoption/${fakeID}`)

            expect(response.statusCode).toBe(404)
            expect(response.body.status).toBe('error')
            expect(response.body.message).toBe('Adoption does not exist')
        })

        test('Should return 500 when database fails', async () => {
            jest.spyOn(AdoptionDAO.prototype, 'getAdoptionByFilter').mockRejectedValue(new Error('Database connection failed'))
            const adoption = await AdoptionModel.findOne({ document: 'DOC1122' }).lean()
            const response = await request(app).get(`/api/adoption/${adoption._id}`)
            
            expect(response.statusCode).toBe(500)
            expect(response.body.status).toBe('error')
            expect(response.body.message).toBe('Database connection failed')
        })

    })

    describe('POST / -> Create a new adoption registry', () => {

        test('Should create a new adoption registry successfully', async () => {
            const newAdoption = {
                document: "DOC1852",
                completeName: "Mariana Silvera",
                address: "Rambla Costanera 1286",
                email: "mariana.silvera@gmail.com",
                age: 42,
                petType: "dog",
                petPatent: "DOG701",
                petName: "Goni",
                petAge: 1
            }
            const response = await request(app).post('/api/adoption').send(newAdoption)

            expect(response.statusCode).toBe(201)
            expect(response.body.status).toBe('success')
            expect(response.body.payload.document).toBe('DOC1852')
        })

        test('Should return 400 error', async () => {
            const newAdoption = {
                document: "DOC1852",
                address: "Rambla Costanera 1286",
                email: "mariana.silvera@gmail.com",
                age: 42,
                petType: "dog",
                petPatent: "DOG701",
                petName: "Goni",
                petAge: 1
            }
            const response = await request(app).post('/api/adoption').send(newAdoption)

            expect(response.statusCode).toBe(400)
            expect(response.body.status).toBe('error')
            expect(response.body.message).toBe('Missing or invalid fields')
        })

        test('Should return 500 when database fails', async () => {
            jest.spyOn(AdoptionDAO.prototype, 'createAdoption').mockRejectedValue(new Error('Database connection failed'))
            const newAdoption = {
                document: "DOC1852",
                completeName: "Mariana Silvera",
                address: "Rambla Costanera 1286",
                email: "mariana.silvera@gmail.com",
                age: 42,
                petType: "dog",
                petPatent: "DOG701",
                petName: "Goni",
                petAge: 1
            }
            const response = await request(app).post('/api/adoption').send(newAdoption)
            
            expect(response.statusCode).toBe(500)
            expect(response.body.status).toBe('error')
            expect(response.body.message).toBe('Database connection failed')
        })

    })

    describe('PUT /:id -> Update an existing adoption registry', () => {

        test('Should update one or more fields in an existing adoption registry', async () => {
            const adoption = await AdoptionModel.findOne({ document: 'DOC1122' }).lean()
            const update = {
                petName: "Rec"
            }
            const response = await request(app).put(`/api/adoption/${adoption._id}`).send(update)

            expect(response.statusCode).toBe(200)
            expect(response.body.status).toBe('success')
            expect(response.body.payload).toBeDefined()
            expect(response.body.payload.acknowledged).toBe(true)
            expect(response.body.payload.modifiedCount).toBe(1)
        })

        test('Should return 404 error', async () => {
            const fakeID = new mongoose.Types.ObjectId()
            const update = {
                petName: "Rec"
            }
            const response = await request(app).put(`/api/adoption/${fakeID}`).send(update)

            expect(response.statusCode).toBe(404)
            expect(response.body.status).toBe('error')
            expect(response.body.message).toBe('Adoption does not exist')
        })

        test('Should return 400 error - trying to update adoptions date', async () => {
            const adoption = await AdoptionModel.findOne({ document: 'DOC1122' }).lean()
            const update = {
                adoptionDate: "2026-03-22T17:56:16.774Z"
            }
            const response = await request(app).put(`/api/adoption/${adoption._id}`).send(update)

            expect(response.statusCode).toBe(400)
            expect(response.body.status).toBe('error')
            expect(response.body.message).toBe('Is not allowed to modify adoption date')
        })

        test('Should return 400 error - trying to update adoptions id', async () => {
            const adoption = await AdoptionModel.findOne({ document: 'DOC1122' }).lean()
            const update = {
                _id: "6a32d21a092abeec9705c4be"
            }
            const response = await request(app).put(`/api/adoption/${adoption._id}`).send(update)

            expect(response.statusCode).toBe(400)
            expect(response.body.status).toBe('error')
            expect(response.body.message).toBe('Is not allowed to modify adoption id')
        })

        test('Should return 500 when database fails', async () => {
            jest.spyOn(AdoptionDAO.prototype, 'modifyAdoption').mockRejectedValue(new Error('Database connection failed'))
            const adoption = await AdoptionModel.findOne({ document: 'DOC1122' }).lean()
            const update = {
                petName: "Rec"
            }
            const response = await request(app).put(`/api/adoption/${adoption._id}`).send(update)
            
            expect(response.statusCode).toBe(500)
            expect(response.body.status).toBe('error')
            expect(response.body.message).toBe('Database connection failed')
        })

    })

    describe('DELETE /:id -> Delete an existing adoption registry', () => {

        test('Should delete an existing adoption registry', async () => {
            const adoption = await AdoptionModel.findOne({ document: 'DOC7890' }).lean()
            const response = await request(app).delete(`/api/adoption/${adoption._id}`)

            expect(response.statusCode).toBe(200)
            expect(response.body.status).toBe('success')
            expect(response.body.payload).toBeDefined()
            expect(response.body.payload.acknowledged).toBe(true)
            expect(response.body.payload.deletedCount).toBe(1)
        })

        test('Should return 404 error', async () => {
            const fakeID = new mongoose.Types.ObjectId()
            const response = await request(app).delete(`/api/adoption/${fakeID}`)

            expect(response.statusCode).toBe(404)
            expect(response.body.status).toBe('error')
            expect(response.body.message).toBe('Adoption does not exist')
        })

        test('Should return 500 when database fails', async () => {
            jest.spyOn(AdoptionDAO.prototype, 'deleteAdoption').mockRejectedValue(new Error('Database connection failed'))
            const adoption = await AdoptionModel.findOne({ document: 'DOC1122' }).lean()
            const response = await request(app).delete(`/api/adoption/${adoption._id}`)
            
            expect(response.statusCode).toBe(500)
            expect(response.body.status).toBe('error')
            expect(response.body.message).toBe('Database connection failed')
        })

    })

})

describe('validateAdoption', () => {
    const service = new AdoptionService({})

    test('Should return true when adoption data is valid', () => {
        const adoption = {
            document: 'DOC3375',
            completeName: 'Juan Perez',
            address: '18 de Julio 1234',
            email: 'juan@gmail.com',
            age: 30,
            petType: 'dog',
            petPatent: 'DOG123',
            petName: 'Rocky',
            petAge: 5
        }
        expect(service.validateAdoption(adoption)).toBe(true)
    })

    test('Should return false when adoption data is missing one required value', () => {
        const adoption = {
            document: 'DOC3375',
            address: '18 de Julio 1234',
            email: 'juan@gmail.com',
            age: 30,
            petType: 'dog',
            petPatent: 'DOG123',
            petName: 'Rocky',
            petAge: 5
        }
        expect(service.validateAdoption(adoption)).toBe(false)
    })

    test('Should return false when any adoption data type(string) is incorrect', () => {
        const adoption = {
            document: 'DOC3375',
            completeName: 'Juan Perez',
            address: 4,
            email: 'juan@gmail.com',
            age: 30,
            petType: 'dog',
            petPatent: 'DOG123',
            petName: 'Rocky',
            petAge: 5
        }
        expect(service.validateAdoption(adoption)).toBe(false)
    })

    test('Should return false when any adoption data type(number) is incorrect', () => {
        const adoption = {
            document: 'DOC3375',
            completeName: 'Juan Perez',
            address: '18 de Julio 1234',
            email: 'juan@gmail.com',
            age: '30',
            petType: 'dog',
            petPatent: 'DOG123',
            petName: 'Rocky',
            petAge: 5
        }
        expect(service.validateAdoption(adoption)).toBe(false)
    })

})