import express from 'express';
import { check } from 'express-validator';
import mongoose from 'mongoose';
import multer from 'multer';

import { validateAdmin } from '../middleware/valitate-admin.js';
import { authenticateUser } from '../middleware/validateall.js';

import { validarCampos } from '../middleware/validate-fields.js';
import controllerApprentice from '../controllers/apprentice.js';
import  ficheHelper  from '../helpers/fiches.js';
import { apprenticeHelper } from '../helpers/apprentice.js';
import {modalityHelper} from '../helpers/modality.js'


const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();


router.post('/upload-apprentices',[
    validateAdmin,
     upload.single('file'),
     validarCampos
],controllerApprentice.uploadApprentices);





//---------------------------------------------------------
router.post('/loginApprentice', [
    check('email')
        .isEmail().withMessage('El email es obligatorio y debe ser un email válido')
        .custom(async (email) => {
            const exists = await apprenticeHelper.notExistEmail(email);
            if (exists) {
                throw new Error('No existe un aprendiz con ese email');
            }
            return true;
        }),
    check('numDocument', 'El documento es obligatorio').notEmpty()
        .custom(apprenticeHelper.notExistNumDocument),

    validarCampos,
], controllerApprentice.loginApprentice);

//-------------------------------------------------------------
router.get('/listallapprentice', [
    validateAdmin,
], controllerApprentice.listallapprentice);



router.get('/listallapprenticeBy', [
    authenticateUser,
], controllerApprentice.listallapprentice);
//-------------------------------------------------------------


//-------------------------------------------------------------
router.get('/listapprenticebyid/:id', [
    validateAdmin,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(apprenticeHelper.existApprentice),
    validarCampos
], controllerApprentice.listapprenticebyid);


//-------------------------------------------------------------rs
router.get('/listapprenticebyfiche/:idfiche', [
    validateAdmin,
    check('idfiche', 'El ID de la ficha es obligatorio').notEmpty(), 
    check('idfiche').custom(async (idfiche, { req }) => {

        if (!mongoose.Types.ObjectId.isValid(idfiche)) {
            throw new Error('El ID de la ficha debe ser un ObjectId válido');
        }
        await ficheHelper.validateFicheID(idfiche, req.headers.token); 
    }),
    validarCampos,
], controllerApprentice.listapprenticebyfiche);

//-------------------------------------------------------------
router.get('/listapprenticebystatus/:status', [
    validateAdmin,
    check('status', 'El status es obligatorio').notEmpty(),
    validarCampos
], controllerApprentice.listapprenticebystatus);


//-------------------------------------------------------------
router.get('/listapprenticebymodality/:idModality', [
    validateAdmin,
    check('idModality', 'La idModality es obligatoria').notEmpty(),
    check('idModality').custom(modalityHelper.existsModalityID),
    validarCampos
], controllerApprentice.listapprenticebymodality);



//------------------------------------------------------------- 
router.post('/addapprentice', [
    validateAdmin,
    check('fiche', 'El campo ficha es obligatorio').notEmpty(),
    check('fiche.idFiche', 'El ID no es válido').isMongoId(),
    check('fiche.idFiche').custom(async (idFiche, { req }) => {
        await ficheHelper.validateFicheID(idFiche, req.headers.token);
    }),
    check('fiche.number', 'El código de la ficha es obligatorio').notEmpty(),
    check('fiche.name', 'El nombre de la ficha es obligatorio').notEmpty(),
    check('idModality', 'La idModality es obligatoria').notEmpty(),
    check('idModality').custom(modalityHelper.existsModalityID),
    check('tpDocument', 'El tipo de documento es obligatorio').notEmpty(),
    check('numDocument', 'El número de documento es obligatorio').notEmpty(),
    check('numDocument').custom(apprenticeHelper.esNumDocumentoValido),
    check('firstName', 'El nombre es obligatorio').notEmpty(),
    check('lastName', 'El apellido es obligatorio').notEmpty(),
    check('phone', 'El teléfono es obligatorio').notEmpty(),
    check('institutionalEmail', 'El email institucional es obligatorio').notEmpty(),
    check('institutionalEmail').isEmail().withMessage('El email institucional debe ser válido').custom(apprenticeHelper.esInstitutionalEmailValido),
    check('personalEmail', 'El email personal es obligatorio').notEmpty(),
    check('personalEmail').isEmail().withMessage('El email personal debe ser válido').custom(apprenticeHelper.esPersonalEmailValido),
    validarCampos
], controllerApprentice.addApprentice);


//-------------------------------------------------------------
router.put('/updateapprenticebyid/:id', [
    validateAdmin,
    check('id', 'El ID no es válido').isMongoId(),
    check('fiche.idFiche', 'El ID de la ficha no es válido').optional().isMongoId(),
    check('fiche.idFiche').optional().custom(async (idFiche, { req }) => {
        await ficheHelper.validateFicheID(idFiche, req.headers.token);
    }),
    check('fiche.number', 'El código de la ficha es obligatorio').optional().notEmpty(),
    check('fiche.name', 'El nombre de la ficha es obligatorio').optional().notEmpty(),
    check('idModality').optional().custom(modalityHelper.existsModalityID),
    check('tpDocument', 'El tipo de documento es obligatorio').optional().notEmpty(),
    check('numDocument', 'El número de documento es obligatorio').optional().notEmpty(),
    check('numDocument').optional().custom((numDocument, { req }) => apprenticeHelper.esNumDocumentoValido(numDocument, req.params.id)),
    check('firstName', 'El nombre es obligatorio').optional().notEmpty(),
    check('lastName', 'El apellido es obligatorio').optional().notEmpty(),
    check('phone', 'El teléfono es obligatorio').optional().notEmpty(),

    check('institutionalEmail').optional().isEmail().withMessage('El email institucional debe ser válido').custom((institutionalEmail, { req }) => apprenticeHelper.esInstitutionalEmailValido(institutionalEmail, req.params.id)),
    check('personalEmail').optional().isEmail().withMessage('El email personal debe ser válido').custom((personalEmail, { req }) => apprenticeHelper.esPersonalEmailValido(personalEmail, req.params.id)),

    validarCampos
], controllerApprentice.updateapprenticebyid);


//-------------------------------------------------------------
router.put('/updateStatus/:id', [
    validateAdmin,
    check('id', 'El ID no es válido').isMongoId(),
    check('status', 'El status es obligatorio').notEmpty(),
    
    validarCampos
], controllerApprentice.updateStatus);





// -----------------------------------------------------------------
router.put('/enableapprentice/:id', [
    validateAdmin,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(apprenticeHelper.existApprentice),
    validarCampos
], controllerApprentice.enableapprentice);

//----------------------------------------------------------------
router.put('/disableapprentice/:id', [
    validateAdmin,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(apprenticeHelper.existApprentice),
    validarCampos
], controllerApprentice.disableapprentice);

export default router;