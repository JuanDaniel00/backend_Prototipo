import express from 'express';
import { check } from 'express-validator';
import { validateAdmin } from '../middleware/valitate-admin.js';
import { validarCampos } from '../middleware/validate-fields.js';
import controllerFollowup from '../controllers/followup.js'
import {followupHelper} from '../helpers/followup.js'
import { instructorHelper } from '../helpers/instructor.js'
import {registerHelper} from '../helpers/register.js';
 
const router = express.Router();


//-------------------------------------------------------------
router.get('/listallfollowup',[
    validateAdmin,
], controllerFollowup.listallfollowup
)


//-------------------------------------------------------------
router.get('/listfollowupbyid/:id',[
    validateAdmin,
    check('id','El id no es valido').isMongoId(),
    check('id').custom(followupHelper.existsFollowupID),
    validarCampos
], controllerFollowup.listfollowupbyid)

router.get('/listBinnaclesByRegister/:register',[
    validateAdmin,
    check('register', "no es valido").isMongoId(),
    check('register').custom(registerHelper.existResgister),
    validarCampos
 ],controllerFollowup.listFollowupByRegister)

//-------------------------------------------------------------
router.get('/listfollowupbyinstructor/:idinstructor',[
    validateAdmin,
    check('idinstructor').custom(async (idinstructor, { req }) => {
       await instructorHelper.existsInstructorsID(idinstructor, req.headers.token);
     }),
    validarCampos
], controllerFollowup.listfollowupbyinstructor)

//-------------------------------------------------------------
router.post('/addfollowup',[
    validateAdmin,
    check('register').custom(registerHelper.existResgister),
    check('instructor', 'El instructor es obligatorio').notEmpty(),
    check('instructor.idinstructor', 'El id no es válido').isMongoId(),
    check('idinstructor').custom(async (idInstructor, { req }) => {
      if (idInstructor) {
        await instructorHelper.existsInstructorsID(idInstructor, req.headers.token);
      }
    }),
    check('number','El number es obligatorio').notEmpty(),
    check('month','El month es obligatorio').notEmpty(),
    check('document','El document es obligatorio').notEmpty(),
    validarCampos
],controllerFollowup.addfollowup)

//-------------------------------------------------------------
router.put('/updatefollowupbyid/:id',[
    validateAdmin,
    check('id','El id no es valido').isMongoId(),
    check('number','El number es maximo de 10 caracteres').isLength({ max: 10 }),
    check('document','El document es maximo de 50 caracteres').isLength({ max: 50 }),
    check('observations','El observations es de maximo 50 caracteres').isLength({ max: 50 }),
    validarCampos
],controllerFollowup.updatefollowupbyid)

// ----------------------------------------------------------------
router.put('/updatestatus/:id/:status',[
    validateAdmin,
    check('id','El id no es valido').isMongoId(),
    check('id').custom(followupHelper.existsFollowupID),
    validarCampos
],controllerFollowup.updatestatus)


router.put('/validateHoursFollowup/:id', [
    validateAdmin,
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(followupHelper.existsFollowupID),
    validarCampos
 ],controllerFollowup.validateHoursFollowup);


router.put('/addobservation/:id', [
    validateAdmin,
    check('id', 'El id del seguimiento no es válido').isMongoId(),
    check('observation', 'La observación es obligatoria').not().isEmpty(),
    validarCampos,
], controllerFollowup.addObservation);


router.get('/getobservations/:id', [
    check('id', 'El id de la seguimiento no es válido').isMongoId(),
    validarCampos,
], controllerFollowup.getObservations); 


export default router;
