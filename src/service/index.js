import AdoptionDAO from "../dao/AdoptionDAO.js";
import AdoptionService from "./adoption.service.js";

export const adoptionService = new AdoptionService(new AdoptionDAO)