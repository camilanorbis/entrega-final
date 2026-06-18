import mongoose from 'mongoose'
import { connectDB } from '../src/config/db.js'
import { config } from '../src/config/config.js'
import { jest } from '@jest/globals'
import { logger } from '../src/utils/logger.js'

describe('connectDB', () => {

    afterEach (async () => {
        jest.restoreAllMocks()
    })

    test('Should throw error when mongoose connection fails', async () => {
        jest.spyOn(mongoose, 'connect').mockRejectedValue(new Error('Database connection failed'))
        const loggerSpy = jest.spyOn(logger, 'error')
        await expect(connectDB(config.MONGO_URL,config.DB_NAME_TEST)).rejects.toThrow('Database connection failed')
        expect(loggerSpy).toHaveBeenCalledWith({msg: 'Unable to connect mongoose'})
    })

})