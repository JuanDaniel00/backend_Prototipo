import Followup from "../models/followup.js";

const followupHelper = {
    existsFollowupID: async (id) => {
        try {
            const exists = await Followup.findById(id);
            if (!exists) {
                throw new Error(`The follow-up with ID ${id} does not exist`);
            }
            return exists;
        } catch (error) {
            throw new Error(`Error searching for follow-up by ID: ${error.message}`);
        }
    },
}

export { followupHelper };