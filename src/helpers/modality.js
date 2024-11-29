import Modality from "../models/modality.js";

const modalityHelper = {
    existsModalityID: async (id) => {
        try {
            const exists = await Modality.findById(id);
            if (!exists) {
                throw new Error(`The modality with ID ${id} does not exist`);
            }
            return exists;
        } catch (error) {
            throw new Error(`Error searching for modality by ID: ${error.message}`);
        }
    },
}

export { modalityHelper };