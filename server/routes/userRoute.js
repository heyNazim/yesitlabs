import express from 'express'
import { allUsers,  deleteUser,  userRegister, userlogin } from '../controllers/userController.js';
import { isAdmin, requireSignIn } from '../middlewares/userMiddleware.js';
const router = express.Router()

router.post('/login', userlogin )
router.post('/register', userRegister )
router.get('/allusers',  allUsers )
router.get('/allusers',  allUsers )
router.delete('/deleteuser/:id', deleteUser);



export default router;

