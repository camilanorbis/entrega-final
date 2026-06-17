import AdoptionDAO from "../dao/AdoptionDAO.js";
import AdoptioService from "./adoption.service.js";

export const adoptionService = new AdoptioService(new AdoptionDAO)