import express from "express";
import verifyEmail from "../controllers/auth/verifyEmail.js";
import { registeration , registerValidation} from "../controllers/auth/UserRegisteration.js";
import { Login , loginValidation } from "../controllers/auth/UserLogin.js";
import updatename from "../controllers/update/updatename.js"
import {updatePassword ,updatePasswordValidation} from "../controllers/update/updatePassword.js"
import auth from "../utils/auth.js"
const router = express.Router();




//          REDIRECT TO USERRIGESTRATION CONTROLLER


router.post("/register", registerValidation, registeration)
router.post("/login", loginValidation, Login)
router.get("/users/:id/verify/:token/",verifyEmail)
router.post("/user/updateNames", auth ,updatename)
router.post("/user/updatePassword", [auth, updatePasswordValidation] ,updatePassword)

export default router;

// 