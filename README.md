# 🐾 Adoption API

![Node](https://img.shields.io/badge/Node.js-22-green)
![Express](https://img.shields.io/badge/Express-5-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-85EA2D)
![Jest](https://img.shields.io/badge/Jest-Testing-red)
![Coverage](https://img.shields.io/badge/Coverage-100%25-brightgreen)
![Tests](https://img.shields.io/badge/Tests-27%20Passed-success)

API REST desarrollada con **Node.js**, **Express** y **MongoDB** para la gestión de registros de adopción de mascotas.

El proyecto implementa operaciones CRUD completas, documentación automática mediante **Swagger/OpenAPI** y una suite de pruebas automatizadas con **Jest** y **Supertest**, alcanzando un **100% de cobertura**.

---

# Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Swagger (swagger-jsdoc + swagger-ui-express)
- Jest
- Supertest
- Dotenv

---

# Arquitectura

El proyecto implementa una **arquitectura por capas**, donde cada componente posee una responsabilidad específica. Esta organización facilita el mantenimiento, la reutilización del código y la escalabilidad de la aplicación.

```text
                   Cliente HTTP
                         │
                         ▼
                    Express Router
                         │
                         ▼
                   Controller Layer
                         │
                         ▼
                    Service Layer
                         │
                         ▼
                      DAO Layer
                         │
                         ▼
                    MongoDB Database
```

### Flujo de una petición

1. El cliente realiza una solicitud HTTP.
2. El **Router** dirige la petición al controlador correspondiente.
3. El **Controller** recibe la solicitud y delega la lógica de negocio al **Service**.
4. El **Service** aplica las reglas de negocio y utiliza el **DAO** para acceder a la base de datos.
5. El **DAO** interactúa con MongoDB mediante Mongoose.
6. La respuesta vuelve siguiendo el mismo recorrido hasta el cliente.

---

# Estructura del proyecto

El proyecto se encuentra organizado de la siguiente forma:

```text
src
│
├── config/         # Configuración de la aplicación
├── controller/     # Manejo de peticiones HTTP
├── dao/            # Acceso a datos
├── docs/           # Configuración Swagger
├── middleware/     # Middlewares reutilizables
├── model/          # Modelos de datos
├── router/         # Definición de endpoints
├── service/        # Lógica de negocio
├── utils/          # Funciones auxiliares
│
├── app.js
└── server.js
```

---

# Instalación

Clonar el repositorio

```bash
git clone <url-del-repositorio>
```

Ingresar al proyecto

```bash
cd entrega-final
```

Instalar dependencias

```bash
npm install
```

---

# Variables de entorno

Crear un archivo `.env` tomando como referencia el archivo `.env.example`.

Ejemplo:

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/adoption
```

---

# Ejecutar el proyecto

Modo desarrollo

```bash
npm run dev
```

Modo producción

```bash
npm start
```

Servidor disponible en:

```
http://localhost:8080
```

---

# Documentación Swagger

Una vez iniciado el servidor, la documentación interactiva estará disponible en:

```
http://localhost:8080/api/docs
```

La documentación incluye:

- Endpoints disponibles.
- Parámetros de entrada.
- Request Body.
- Respuestas HTTP.
- Esquemas de datos.
- Ejemplos de uso.

---

# Endpoints disponibles

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| GET | `/api/adoption` | Obtiene todas las adopciones |
| GET | `/api/adoption/:id` | Obtiene una adopción por id |
| POST | `/api/adoption` | Crea una nueva adopción |
| PUT | `/api/adoption/:id` | Actualiza una adopción existente |
| DELETE | `/api/adoption/:id` | Elimina una adopción |

---

# Modelo de datos

Cada registro de adopción contiene los siguientes campos:

| Campo | Tipo |
|--------|------|
| document | String |
| completeName | String |
| address | String |
| email | String |
| age | Number |
| petType | String |
| petPatent | String |
| petName | String |
| petAge | Number |
| adoptionDate | Date |

---

# Formato de respuestas

Respuesta exitosa

```json
{
  "status": "success",
  "message": "Operation completed successfully",
  "payload": {}
}
```

Respuesta de error

```json
{
  "status": "error",
  "message": "Internal server error"
}
```

---

# Tests

El proyecto cuenta con pruebas automatizadas utilizando **Jest** y **Supertest**.

Se validan:

- Operaciones CRUD completas.
- Casos exitosos.
- Errores 400.
- Errores 404.
- Errores 500.
- Validaciones de datos.
- Modelos de respuesta.
- Conexión a MongoDB.
- Documentación Swagger.

Ejecutar todos los tests

```bash
npm test
```

Ejecutar únicamente los tests de adopciones

```bash
npm run test test/adoption.test.js
```

Generar reporte de cobertura

```bash
npm run test:coverage
```

## Cobertura

| Métrica | Resultado |
|----------|----------:|
| Statements | 100% |
| Branches | 100% |
| Functions | 100% |
| Lines | 100% |

---

# Estructura de pruebas

```text
test
│
├── adoption.test.js
├── apiResponse.test.js
├── connectDB.test.js
└── docs.test.js
```

---

# Autor

Proyecto desarrollado como entrega final del curso **Backend III**.