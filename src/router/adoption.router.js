import express from 'express'
import { createAdoption, deleteAdoption, getAdoptionById, getAdoptions, updateAdoption } from '../controller/adoption.controller.js'

const router = express.Router()

/**
 * @swagger
 * /api/adoption:
 *  post:
 *      summary: Create new adoption
 *      description: Creates a new adoption registry based on info given in request body
 *      tags:
 *          - Adoption
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AdoptionInput'
 *      responses:
 *          201:
 *              description: Adoption created successfully
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/AdoptionResponse'
 *          400:
 *              description: Missing or invalid field
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/BadRequestResponse'
 *          500:
 *              description: Internal server error
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/ErrorResponse'
 * 
 */
router.post("/", createAdoption)

/**
 * @swagger
 * /api/adoption:
 *  get:
 *      summary: Get adoptions
 *      description: Returns a list with all adoptions registries
 *      tags:
 *          - Adoption
 *      responses:
 *          200:
 *              description: Adoptions list returned successfully
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/AdoptionsResponse'
 *          400:
 *              description: Unable to return adoptions
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/BadRequestResponse'
 *          500:
 *              description: Internal server error
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/ErrorResponse'
 * 
 */
router.get("/", getAdoptions)

/**
 * @swagger
 * /api/adoption/{id}:
 *  get:
 *      summary: Get adoption
 *      description: Returns adoption registry corresponding with path id
 *      tags:
 *          - Adoption
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: adoption Id
 *            schema:
 *              type: string
 *            example: 6a32dfc0d84e8291ab26dd6e
 *      responses:
 *          200:
 *              description: Adoption found
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/AdoptionResponse'
 *          404:
 *              description: Adoption does not exist
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/NotFoundErrorResponse'
 *          500:
 *              description: Internal server error
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/ErrorResponse'
 * 
 */
router.get("/:id", getAdoptionById)

/**
 * @swagger
 * /api/adoption/{id}:
 *  put:
 *      summary: Update adoption
 *      description: Updates fields given by request body in adoption corresponding to path id
 *      tags:
 *          - Adoption
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: adoption Id
 *            schema:
 *              type: string
 *            example: 6a32dfc0d84e8291ab26dd6e
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateAdoptionInput'
 *      responses:
 *          200:
 *              description: Adoption modified successfully
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/UpdateResponse'
 *          400:
 *              description: Error updating adoption
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/BadRequestResponse'
 *          404:
 *              description: Adoption does not exist
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/NotFoundErrorResponse'
 *          500:
 *              description: Internal server error
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/ErrorResponse'
 * 
 */
router.put("/:id", updateAdoption)

/**
 * @swagger
 * /api/adoption/{id}:
 *  delete:
 *      summary: Delete adoption
 *      description: Deletes an adoption registry corresponding with path id
 *      tags:
 *          - Adoption
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: adoption Id
 *            schema:
 *              type: string
 *            example: 6a32dfc0d84e8291ab26dd6e
 *      responses:
 *          200:
 *              description: Adoption deleted successfully
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/DeleteResponse'
 *          400:
 *              description: Error deleting adoption
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/BadRequestResponse'
 *          404:
 *              description: Adoption does not exist
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/NotFoundErrorResponse'
 *          500:
 *              description: Internal server error
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/ErrorResponse'
 * 
 */
router.delete("/:id", deleteAdoption)

export default router;