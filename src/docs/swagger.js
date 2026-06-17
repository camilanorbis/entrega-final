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

        components: {}
    },

    apis: ['./src/routes/*.js']
})