import express from 'express';
import { check } from 'express-validator';
import { validateAdmin } from '../middleware/valitate-admin.js';
import { validarCampos } from '../middleware/validate-fields.js';
import logController from '../controllers/logs.js';
import { logsHelper } from '../helpers/logs.js';

const router = express.Router();

//------------------------------------------------
router.get('/listlogs', [
    validateAdmin
], logController.listlogs);

//------------------------------------------------

router.get('/listlogs/:id', [
    validateAdmin,
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom(logsHelper.existsLogID),
    validarCampos
], logController.listlogsbyid);

//------------------------------------------------
router.post('/addlog', [
    validateAdmin,
    check('users', 'El campo users es obligatorio').notEmpty(),
    check('email', 'El campo email es obligatorio').notEmpty().isEmail(), 
    check('email').custom(logsHelper.existEmail), 
    check('action', 'El campo action es obligatorio').notEmpty(),
    check('information', 'El campo information es obligatorio').notEmpty(),
    validarCampos
], logController.addlog);

// -------------------------------------------------
router.put('/enablelogsbyid/:id', [
    validateAdmin,
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom(logsHelper.existsLogID),
    validarCampos
], logController.enablelogsbyid);

//------------------------------------------------
router.put('/disablelogsbyid/:id', [
    validateAdmin,
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom(logsHelper.existsLogID),
    validarCampos
], logController.disablelogsbyid);


export default router;