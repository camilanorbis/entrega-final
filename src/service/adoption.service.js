import { logger } from '../utils/logger.js'

export default class AdoptionService {

    constructor (adoptionDao) {
        this.adoptionDao = adoptionDao
    }

    async createAdoption (adoption) {
        if (!this.validateAdoption(adoption)){
            const error = new Error('Missing or invalid fields')
            error.statusCode = 400
            throw error
        }
        adoption.adoptionDate = new Date()
        
        const result = await this.adoptionDao.createAdoption(adoption)
        return result
    }

    async getAdoptions () {
        return await this.adoptionDao.getAdoptions()        
    }

    async getAdoptionByFilter (filter) {
        const result = await this.adoptionDao.getAdoptionByFilter(filter)
        if (!result){
            const error = new Error('Adoption does not exist')
            error.statusCode = 404
            throw error
        }
        
        return result
    }

    async modifyAdoption (id, adoption) {
        const originalAdoption = await this.getAdoptionByFilter({ _id: id })

        if (adoption.id || adoption._id){
            const error = new Error('Is not allowed to modify adoption id')
            error.statusCode = 400
            throw error
        }

        if (adoption.adoptionDate){
            const error = new Error('Is not allowed to modify adoption date')
            error.statusCode = 400
            throw error
        }
        
        const result = await this.adoptionDao.modifyAdoption(id, { $set: adoption })       
        return result
    }

    async deleteAdoption (id) {
        const adoption = await this.getAdoptionByFilter({ _id: id })
        const result = await this.adoptionDao.deleteAdoption(id)
        return result
    }


    validateAdoption = (adoption) => {
        const { document, completeName, address, email, age, petType, petPatent, petName, petAge } = adoption

        if (!document || !completeName || !address || !email || !petType || !petPatent || !petName)
            return false

        if (
            typeof document !== 'string' ||
            typeof completeName !== 'string' ||
            typeof address !== 'string' ||
            typeof email !== 'string' ||
            typeof petType !== 'string' ||
            typeof petPatent !== 'string' ||
            typeof petName !== 'string'
        )
            return false

        if ((age && typeof age !== 'number') || (petAge && typeof petAge !== 'number'))
            return false

        return true
    }
    
}    