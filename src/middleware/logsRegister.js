import logs from "../models/logs.js";
import { jwtDecode } from 'jwt-decode';

export const registerLogs = async (req, res, next) => {
  try {
    const { email, password, rememberMe, role, ...rest } = req.body;
    const requestBody = password ? { email, rememberMe } : rest;

    const token = req.headers.token;  

    let usuario = 'Desconocido';  
    let emailUsuario = 'Desconocido';  

    if (token) {
      try {
        const decoded = jwtDecode(token);  

        usuario = decoded.rol || 'Desconocido';  
        emailUsuario = decoded.email || 'Desconocido';  

      } catch (error) {
        console.error("Error al decodificar el token:", error);
        usuario = 'Desconocido';
        emailUsuario = 'Desconocido';
      }
    } else {
      usuario = role || 'Desconocido';  
      emailUsuario = email || 'Desconocido'; 
    }

    const log = new logs({
      users: usuario,   
      email: emailUsuario,  
      action: req.method,  
      url: req.originalUrl,  
      information: req.headers,  
      requestBody,  
    });

    await log.save();

    next();
  } catch (error) {
    console.error("Error al registrar el log:", error);
    return res.status(500).json({
      error: "Ocurrió un error al guardar el registro del log.",
    });
  }
};
