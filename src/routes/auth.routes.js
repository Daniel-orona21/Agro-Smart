import { Router } from "express";
import { login, register, profile,logout } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js"; // este es para comprobar que el usuario esta logeado


const router = Router()

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', authRequired, profile);


export default router