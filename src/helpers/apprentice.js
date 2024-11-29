import Apprentice from "../models/apprentice.js";

const apprenticeHelper = {

  // Verifica si el ID del aprendiz existe -------------------------------------------------------------------------------------------------
  existApprentice: async (id) => {
    try {
      const exist = await Apprentice.findById(id);
      if (!exist) {
        throw new Error(`No existe el ID: ${id}`);
      }
      return exist;
    } catch (error) {
      throw new Error(`Error al verificar el ID: ${error.message}`);
    }
  },

  // Verifica si el numDocument ya existe, excluyendo el propio registro si está editando ---------------------------------------------------------------
  esNumDocumentoValido: async (numDocument, id = null) => {
    try {
      const documento = await Apprentice.findOne({ numDocument });
      if (documento && (!id || documento._id.toString() !== id.toString())) {
        throw new Error(`El documento ${numDocument} ya existe`);
      }
    } catch (error) {
      throw new Error(`Error al verificar numDocument: ${error.message}`);
    }
  },

  // Verifica si el institutionalEmail ya existe, excluyendo el propio registro si está editando ---------------------------------------------------------
  esInstitutionalEmailValido: async (institutionalEmail, id = null) => {
    try {
      const correo = await Apprentice.findOne({ institutionalEmail });
      if (correo && (!id || correo._id.toString() !== id.toString())) {
        throw new Error(`El email institucional ${institutionalEmail} ya existe`);
      }
    } catch (error) {
      throw new Error(`Error al verificar email institucional: ${error.message}`);
    }
  },

  // Verifica si el personalEmail ya existe, excluyendo el propio registro si está editando ---------------------------------------------
  esPersonalEmailValido: async (personalEmail, id = null) => {
    try {
      const correo = await Apprentice.findOne({ personalEmail });
      if (correo && (!id || correo._id.toString() !== id.toString())) {
        throw new Error(`El email personal ${personalEmail} ya existe`);
      }
    } catch (error) {
      throw new Error(`Error al verificar email personal: ${error.message}`);
    }
  },

  // Verifica si el numDocument NO existe ---------------------------------------------------------------------
  notExistNumDocument: async (numDocument) => {
    try {
      const documento = await Apprentice.findOne({ numDocument });
      if (!documento) {
        throw new Error(`No existe un aprendiz con el número de documento: ${numDocument}`);
      }
      return true;
    } catch (error) {
      throw new Error(`Error al verificar número de documento: ${error.message}`);
    }
  },

// Verifica si el institutionalEmail NO existe ---------------------------------------------------------------
notExistInstitutionalEmail: async (institutionalEmail) => {
    try {
        const correo = await Apprentice.findOne({ institutionalEmail });
        return correo === null; 
    } catch (error) {
        throw new Error(`Error al verificar email institucional: ${error.message}`);
    }
},

// Verifica si el personalEmail NO  ---------------------------------------------------------------
notExistPersonalEmail: async (personalEmail) => {
    try {
        const correo = await Apprentice.findOne({ personalEmail });
        return correo === null; 
    } catch (error) {
        throw new Error(`Error al verificar email personal: ${error.message}`);
    }
},


// Verifica si el email NO existe (institucional o personal)
notExistEmail: async (email) => {
    try {
        const institutionalEmailExists = await Apprentice.findOne({ institutionalEmail: email });
        const personalEmailExists = await Apprentice.findOne({ personalEmail: email });
        if (!institutionalEmailExists && !personalEmailExists) {
            return true; // El email no existe
        }
        return false; // Al menos uno de los correos existe
    } catch (error) {
        throw new Error(`Error al verificar el email: ${error.message}`);
    }
},

}

export { apprenticeHelper };
