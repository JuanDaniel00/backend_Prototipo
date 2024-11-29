import logs from "../models/logs.js";

const logsHelper = {
    // Verificar si existe un log por ID
    existsLogID: async (id) => {
        try {
            const exists = await logs.findById(id);
            if (!exists) {
                throw new Error(`The log with ID ${id} does not exist`);
            }
            return exists;
        } catch (error) {
            throw new Error(`Error searching for log by ID: ${error.message}`);
        }
    },


    existEmail: async (email) => {
        try {
            const exists = await logs.findOne({ email }); 
            if (exists) {
                throw new Error(`The email ${email} already exists in the database`);
            }
        } catch (error) {
            throw new Error(`Error verifying email: ${error.message}`);
        }
    },

 
    verifyEmail: async (email) => {
        try {
            const exists = await logs.findOne({ email }); 
            if (!exists) {
                throw new Error(`The email ${email} is not registered`);
            }
            return exists;
        } catch (error) {
            throw new Error(`Error verifying email: ${error.message}`);
        }
    },
};

export { logsHelper };