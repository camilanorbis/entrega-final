import { adoptionService } from "../service/index.js";
import { successResponse } from '../utils/apiResponse.js'

export const createAdoption = async (req,res,next) => {
    try {
        const adoption = req.body
        const response = await adoptionService.createAdoption(adoption)
        return successResponse(res, { statusCode: 201, message: 'Adoption created successfully', payload: response })
    } catch (error) {
        next(error)
    }
}

export const getAdoptions = async (req,res,next) => {
    try {
        const response = await adoptionService.getAdoptions()
        return successResponse(res, { statusCode: 200, message: 'Adoptions list returned successfully', payload: response })
    } catch (error) {
        next(error)
    }
}

export const getAdoptionById = async (req,res,next) => {
    try {
        const id = req.params.id
        const response = await adoptionService.getAdoptionByFilter({ _id: id })
        return successResponse(res, { statusCode: 200, message: 'Adoption found', payload: response })
    } catch (error) {
        next(error)
    }
}

export const updateAdoption = async (req,res,next) => {
    try {
        const id = req.params.id
        const adoption = req.body
        const response = await adoptionService.modifyAdoption(id,adoption)
        return successResponse(res, { statusCode: 200, message: 'Adoption modified successfully', payload: response })
    } catch (error) {
        next(error)
    }
}

export const deleteAdoption = async (req,res,next) => {
    try {
        const id = req.params.id
        const response = await adoptionService.deleteAdoption(id)
        return successResponse(res, { statusCode: 200, message: 'Adoption deleted successfully', payload: response })
    } catch (error) {
        next(error)
    }
}