import express from "express";
import { detect, languages, register, translate } from "../controllers/googlecontrollers.js";
import { checks, registeredUSer } from "../middlewares/authmiddlewares.js";

const router=express.Router();

router.post('/register',checks,register);
router.post('/detect',registeredUSer,detect);
router.get('/languages',registeredUSer,languages);
router.post('/translate',registeredUSer,translate)

export default router;