import express from 'express'
import { login , protectedData, signup } from '../controller/usercontroller.js'
import { authMiddle } from '../middleware/authmiddle.js'


const router = express.Router()

router.post('/signup', signup); 
router.post('/login' , login)
router.get( '/protected', authMiddle , protectedData);

export default router
