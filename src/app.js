import express from "express"
import adoptionRouter from './router/adoption.router.js'
import docsRouter from './router/docs.router.js'
import http from "http"
import { connectDB } from "./config/db.js"
import { config } from "./config/config.js"
import { requestId } from "./middleware/requestId.js"
import { requestLogger } from "./middleware/requestLogger.js"
import { errorHandler } from "./middleware/errorHandler.js"

const basePathAdoption = '/api/adoption'
const basePathDocs = '/api/docs'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(requestId);
app.use(requestLogger);

app.use(basePathAdoption, adoptionRouter)
app.use(basePathDocs, docsRouter)

app.use(errorHandler)

export default app;