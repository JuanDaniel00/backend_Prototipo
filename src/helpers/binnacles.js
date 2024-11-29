import Binnacles from '../models/binnacles.js'

const binnaclesHelper = {

    // Verifica si la bitácora existe
    existBinnacles: async (id) => {
        try {
            const exist = await Binnacles.findById(id);
            if (!exist) {
                throw new Error(`The binnacle with id: ${id} does not exist`);
            }
            return exist;
        } catch (error) {
            throw new Error(`Error while searching: ${error.message}`);
        }
    },

    // Verifica si el número ya existe solo si ha sido cambiado
    existNumber: async (newNumber, id) => {
        try {
            const binnacle = await Binnacles.findById(id);
            if (binnacle.number !== newNumber) { // Solo validamos si el número ha cambiado
                const exist = await Binnacles.findOne({ number: newNumber });
                if (exist) {
                    throw new Error(`El número ${newNumber} ya existe en la base de datos`);
                }
            }
        } catch (error) {
            throw new Error(`Error al verificar Number: ${error.message}`);
        }
    },

    // Verifica si el número está registrado
    verifyNumber: async (number) => {
        try {
            const exist = await Binnacles.findOne({ number });
            if (!exist) {
                throw new Error(`El número ${number} no está registrado`);
            }
        } catch (error) {
            throw new Error(`Error al verificar Number: ${error.message}`);
        }
    },

    // Verifica si el documento ya existe solo si ha sido cambiado
    existDocument: async (newDocument, id) => {
        try {
            const binnacle = await Binnacles.findById(id);
            if (binnacle.document !== newDocument) { // Solo validamos si el documento ha cambiado
                const exist = await Binnacles.findOne({ document: newDocument });
                if (exist) {
                    throw new Error(`El documento ${newDocument} ya existe en la base de datos`);
                }
            }
        } catch (error) {
            throw new Error(`Error al verificar Document: ${error.message}`);
        }
    },

    // Verifica si el documento está registrado
    verifyDocument: async (document) => {
        try {
            const exist = await Binnacles.findOne({ document });
            if (!exist) {
                throw new Error(`El documento ${document} no está registrado`);
            }
        } catch (error) {
            throw new Error(`Error al verificar Document: ${error.message}`);
        }
    },
};

export { binnaclesHelper };
