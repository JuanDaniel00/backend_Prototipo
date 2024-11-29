import jwt from 'jsonwebtoken';
import Apprentice from '../models/apprentice.js';

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "10h"
        }, (err, token) => {
            if (err) {
                reject("No se pudo generar el token");
            } else {
                resolve(token);
            }
        });
    });
};

const validateApprentice = async (req, res, next) => {
    const token = req.header("token");
    if (!token) {
        return res.status(401).json({
            msg: "Token no proporcionado"
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET); 
        if (!uid) {
            return res.status(401).json({
                msg: "Token no válido"
            });
        }

        const apprenticeRecord = await Apprentice.findById(uid);
        if (!apprenticeRecord) {
            return res.status(401).json({
                msg: "Aprendiz no encontrado en la base de datos"
            });
        }

        if (apprenticeRecord.estado === 0) {
            return res.status(401).json({
                msg: "Token no válido - Aprendiz inactivo"
            });
        }

        req.apprentice = apprenticeRecord;
        next(); 

    } catch (error) {
        console.error(error);
        res.status(401).json({
            msg: "Token no válido"
        });
    }
};

export { generarJWT, validateApprentice };
