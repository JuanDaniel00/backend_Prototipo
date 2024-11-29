import axios from 'axios';
import jwt from 'jsonwebtoken';
import Apprentice from '../models/apprentice.js';

const REPFORA = process.env.REPFORA;

export const authenticateUser = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ msg: 'Token no proveído' });
  }

  try {
 
    try {
      const adminValidation = await axios.post(`${REPFORA}/api/users/token/productive/stages`, null, {
        headers: { token },
      });
      console.log('Admin Validation Response:', adminValidation.data);
      if (adminValidation.data.token === true) {
        req.userData = adminValidation.data;
        return next();
      }
    } catch (adminError) {
      console.error('Error en validación de admin:', adminError.response?.data || adminError.message);
    }

    try {
      const instructorValidation = await axios.post(`${REPFORA}/api/instructors/token/productive/stages`, null, {
        headers: { token },
      });
      console.log('Instructor Validation Response:', instructorValidation.data);
      if (instructorValidation.data.token === true) {
        req.userData = instructorValidation.data;
        return next();
      }
    } catch (instructorError) {
      console.error('Error en validación de instructor:', instructorError.response?.data || instructorError.message);
    }

    let uid;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      uid = decoded.uid;
      console.log('UID Decoded:', uid);

      const apprenticeRecord = await Apprentice.findById(uid);
      console.log('Apprentice Record:', apprenticeRecord);

      if (apprenticeRecord && apprenticeRecord.estado !== 0) {
        req.apprentice = apprenticeRecord;
        return next();
      }
    } catch (jwtError) {
      console.error('Error al verificar el token JWT:', jwtError);
    }

    return res.status(401).json({ msg: "Token no válido o usuario no autorizado" });

  } catch (error) {
    console.error('Error general en autenticación:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};