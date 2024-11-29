import express from 'express';
import { check } from 'express-validator';
import { validateAdmin } from '../middleware/valitate-admin.js';
import { validarCampos } from '../middleware/validate-fields.js';
import modalityController from '../controllers/modality.js'
import {modalityHelper} from '../helpers/modality.js'


const router = express.Router();

//-----------------------------------------------------------
router.get('/listallmodality', [
    validateAdmin,
], modalityController.listallmodality);


//-----------------------------------------------------------
router.get('/listmodalitybyid/:id', [
validateAdmin,
check('id', 'El id es invalido').isMongoId(),
check('id').custom(modalityHelper.existsModalityID),
validarCampos
], modalityController.listmodalitybyid);


//-----------------------------------------------------------
router.post('/addmodality', [
  // validateAdmin,
  check('name', 'El campo name es obligatorio').notEmpty(),
  check('hourInstructorFollow')
    .optional()
    .isNumeric().withMessage('El campo hourInstructorFollow debe ser numérico'),
  check('hourInstructorTechnical')
    .optional()
    .isNumeric().withMessage('El campo hourInstructorTechnical debe ser numérico'),
  check('hourInstructorProject')
    .optional()
    .isNumeric().withMessage('El campo hourInstructorProject debe ser numérico'),
  validarCampos
], modalityController.addmodality)

//-----------------------------------------------------------
router.put('/updatemodalitybyid/:id', [
validateAdmin,
check('id', 'El id es invalido').isMongoId(),
check('name', ' El campo name es obligatorio').notEmpty(),
check('hourInstructorFollow','El campo hourInstructorFollow es obligatorio').notEmpty(),
check('hourInstructorTechnical','El campo hourInstructorTechnical es obligatorio').notEmpty(),
check('hourInstructorProject', 'El campo hourInstructorProject es obligatorio').notEmpty(),
validarCampos
], modalityController.updatemodalitybyid);

//-----------------------------------------------------------
router.put('/enablemodalitybyid/:id', [
    validateAdmin,
    check('id', 'El id es inválido').isMongoId(),
    check('id').custom(modalityHelper.existsModalityID),
    validarCampos
  ], modalityController.enablemodalitybyid);
  
  //-----------------------------------------------------------
  router.put('/disablemodalitybyid/:id', [
    validateAdmin,
    check('id', 'El id es inválido').isMongoId(),
    check('id').custom(modalityHelper.existsModalityID),
    validarCampos
  ], modalityController.disablemodalitybyid);



export default router;
