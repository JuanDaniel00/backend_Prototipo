import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const ficheHelper = {
  async validateFicheID(idFiche, token) {
    if (!token) {
      throw new Error("Token es obligatorio");
    }
    if (!idFiche) {
      throw new Error("ID de ficha es obligatorio");
    }
    try {
      const response = await axios.get(`${process.env.REPFORA}/api/fiches/${idFiche}`, { 
        headers: { token } 
      });

      if (!response.data || !response.data._id) {
        throw new Error("ID de ficha no encontrado");
      }
      return response.data; 
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al verificar la ficha: ' + error.message);
    }
  }
};

export default ficheHelper;



