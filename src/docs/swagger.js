import swaggerJSDoc from "swagger-jsdoc"

export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Rest',
            version: '1.0.0',
            description: 'Documentacion de API'
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Servidor local'
            }
        ],

        components: {

            schemas: {

                Adoption: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            example: '6a32df71500f895068f7d36b'
                        },
                        document: {
                            type: 'string',
                            example: 'DOC1234'
                        },
                        completeName: {
                            type: 'string',
                            example: 'Maria Perez'
                        },
                        address: {
                            type: 'string',
                            example: 'Calle 1234'
                        },
                        email: {
                            type: 'string',
                            example: 'mariaperez@gmail.com'
                        },
                        age: {
                            type: 'number',
                            example: 23
                        },
                        petType: {
                            type: 'string',
                            example: 'cat'
                        },
                        petPatent: {
                            type: 'string',
                            example: 'CAT948'
                        },
                        petName: {
                            type: 'string',
                            example: 'Kitty'
                        },
                        petAge: {
                            type: 'number',
                            example: 2
                        },
                        adoptionDate: {
                            type: 'date',
                            example: '2026-06-17T17:54:57.587Z'
                        }
                    }
                },

                AdoptionInput: {
                    type: 'object',
                    properties: {
                        document: {
                            type: 'string',
                            example: 'DOC1234'
                        },
                        completeName: {
                            type: 'string',
                            example: 'Maria Perez'
                        },
                        address: {
                            type: 'string',
                            example: 'Calle 1234'
                        },
                        email: {
                            type: 'string',
                            example: 'mariaperez@gmail.com'
                        },
                        age: {
                            type: 'number',
                            example: 23
                        },
                        petType: {
                            type: 'string',
                            example: 'cat'
                        },
                        petPatent: {
                            type: 'string',
                            example: 'CAT948'
                        },
                        petName: {
                            type: 'string',
                            example: 'Kitty'
                        },
                        petAge: {
                            type: 'number',
                            example: 2
                        }
                    },
                    required: ['document', 'completeName', 'address', 'email', 'petType', 'petPatent', 'petName']
                },

                UpdateAdoptionInput: {
                    type: 'object',
                    properties: {
                        document: {
                            type: 'string',
                            example: 'DOC1234'
                        },
                        completeName: {
                            type: 'string',
                            example: 'Maria Perez'
                        },
                        address: {
                            type: 'string',
                            example: 'Calle 1234'
                        },
                        email: {
                            type: 'string',
                            example: 'mariaperez@gmail.com'
                        },
                        age: {
                            type: 'number',
                            example: 23
                        },
                        petType: {
                            type: 'string',
                            example: 'cat'
                        },
                        petPatent: {
                            type: 'string',
                            example: 'CAT948'
                        },
                        petName: {
                            type: 'string',
                            example: 'Kitty'
                        },
                        petAge: {
                            type: 'number',
                            example: 2
                        }
                    },
                },

                AdoptionResponse: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            example: 'success'
                        },
                        message: {
                            type: 'string',
                            example: 'Adoption created successfully | Adoption found'
                        },
                        payload: {
                            $ref: '#/components/schemas/Adoption'
                        }
                    }
                },

                AdoptionsResponse: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            example: 'success'
                        },
                        message: {
                            type: 'string',
                            example: 'Adoptions list returned successfully'
                        },
                        payload: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Adoption'
                            }
                        }
                    }
                },

                UpdateResponse: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            example: 'success'
                        },
                        message: {
                            type: 'string',
                            example: 'Adoption modified successfully'
                        },
                        payload: {
                            type: 'object',
                            properties: {
                                acknowledged: {
                                    type: 'boolean',
                                    example: true
                                },
                                modifiedCount: {
                                    type: 'number',
                                    example: 1
                                },
                                upsertedId: {
                                    type: 'string',
                                    example: null
                                },
                                upsertedCount: {
                                    type: 'number',
                                    example: 0
                                },
                                matchedCount: {
                                    type: 'number',
                                    example: 1
                                }
                            }
                        }
                    }
                },

                DeleteResponse: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            example: 'success'
                        },
                        message: {
                            type: 'string',
                            example: 'Adoption deleted successfully'
                        },
                        payload: {
                            type: 'object',
                            properties: {
                                acknowledged: {
                                    type: 'boolean',
                                    example: true
                                },
                                deletedCount: {
                                    type: 'number',
                                    example: 1
                                }
                            }
                        }
                    }
                },

                NotFoundErrorResponse: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            example: 'error'
                        },
                        message: {
                            type: 'string',
                            example: 'Adoption does not exist'
                        }
                    }
                },

                BadRequestResponse: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            example: 'error'
                        },
                        message: {
                            type: 'string',
                            example: 'Error handling operation on adoption'
                        }
                    }
                },

                ErrorResponse: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            example: 'error'
                        },
                        message: {
                            type: 'string',
                            example: 'Internal server error'
                        }
                    }
                }

            }

        }
    },

    apis: ['./src/router/*.js']
})