import express from 'express';
import authController from '../controllers/repfora.js'; 

const router = express.Router();


router.post('/loginAdmin', authController.loginAdmin);
router.post('/loginInstructors', authController.loguinInstructors);



router.post('/validate', authController.validateRepfora);


router.get('/instructors', authController.listAllInstructors);
router.get('/instructors/:id', authController.listInstructorById);

router.get('/fiches', authController.listAllFiches); 
router.get('/fiches/:id', authController.listFicheById);





export default router;
