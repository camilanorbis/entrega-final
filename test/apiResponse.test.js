import { jest } from '@jest/globals'
import { successResponse, errorResponse } from '../src/utils/apiResponse.js'

function createMockResponse () {
    return { 
        locals: {},
        status: jest.fn().mockReturnThis(), 
        json: jest.fn()
    }
}

describe('apiResponse helpers', () => {

    test('successResponse should return a success response with status 200, message and payload', () => {
        const res = createMockResponse()
        successResponse(res, {
            message: 'Adoptions list returned successfully',
            payload: [{
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
            }]
        })

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            message: 'Adoptions list returned successfully',
            payload: [{
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
            }]
        })
    })

    test('errorResponse should return an error response with status 404 and message', () => {
        const res = createMockResponse()
        errorResponse(res, {
            statusCode: 404,
            message: 'Adoption does not exist'
        })

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Adoption does not exist'
        });

    })

})


