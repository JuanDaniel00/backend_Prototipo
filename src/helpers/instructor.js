import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const instructorHelper = {
    async existsInstructorsID(idInstructor, token) {
        if (!token) {
            throw new Error('Token es obligatorio');
        }
        if (!idInstructor) {
            throw new Error('ID de instructor es obligatorio');
        }

        try {
            const response = await axios.get(`${process.env.REPFORA}/api/instructors/${idInstructor}`, { 
              headers: { token } 
            });
      
            // Log para depuración
            console.log('Respuesta del instructor:', response.data);

            if (!response.data || !response.data._id) {
              throw new Error("ID de instructor no encontrado");
            }
            return response.data; 
        } catch (error) {
            // Log el error completo para ayudar con el diagnóstico
            console.error('Error al verificar instructor:', error);
            throw new Error(error.response?.data?.message || 'Error al verificar instructor: ' + error.message);
        }
    }
}

export { instructorHelper };
