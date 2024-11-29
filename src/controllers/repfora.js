import axios from 'axios';
import dotenv from 'dotenv';
// Cargar variables de entorno
dotenv.config();

const REPFORA = process.env.REPFORA;  // Cambio aquí

if (!REPFORA) {
  console.error("La variable de entorno REPFORA no está definida.");
}

const authController = {

  // Login
  loginAdmin: async (req, res) => {
    const { email, password, role } = req.body;
    try {
      const response = await axios.post(`${REPFORA}/api/users/login`, { email, password, role });
      const token = response.data.token;
      res.json({ token });
    } catch (error) {
      res.status(error.response?.status || 500).json({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data
      });
    }
  },


  //loguin instructores----------------------------------------------
  loguinInstructors: async (req, res) => {
    const { email, password } = req.body;
    try {
      const response = await axios.post(`${REPFORA}/api/instructors/login`, { email, password });
      const token = response.data.token;
      res.json({ token });
    } catch (error) {
      res.status(error.response?.status || 500).json({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data
      });
    }
  }, 
  
  // Listar todos los instructores
  listAllInstructors: async (req, res) => {
    const token = req.headers['token'];
    try {
      const response = await axios.get(`${REPFORA}/api/instructors`, { headers: { token } });
      res.json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data
      });
    }
  },

  // Listar un instructor por ID
  listInstructorById: async (req, res) => {
    const token = req.headers['token'];
    const { id } = req.params;
    try {
      const response = await axios.get(`${REPFORA}/api/instructors/${id}`, { headers: { token } });
      res.json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data
      });
    }
  },

  // Listar todas las fichas
  listAllFiches: async (req, res) => {
    const token = req.headers['token'];
    try {
      const response = await axios.get(`${REPFORA}/api/fiches`, { headers: { token } });
      res.json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data
      });
    }
  },

  // Listar una ficha por ID
  listFicheById: async (req, res) => {
    const token = req.headers['token'];
    const { id } = req.params;
    try {
      const response = await axios.get(`${REPFORA}/api/fiches/${id}`, { headers: { token } });
      res.json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data
      });
    }
  },

  // Validar el token
  validateRepfora: async (req, res) => {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({
        message: 'Token no proveído',
      });
    }
    try {
      const response = await axios.post(`${REPFORA}/api/users/token/productive/stages`, null, {
        headers: { token: token }
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({
        message: error.response?.data?.message || 'Error en la validación del token',
        status: error.response?.status,
        data: error.response?.data || null
      });
    }
  }

};

export default authController;
