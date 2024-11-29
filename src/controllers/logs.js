import logs from "../models/logs.js";

const logController = {

  // Listar todos los logs---------------------------------------------
  listlogs: async (req, res) => {
    try {
      const log = await logs.find();
      console.log("Log list:", log);
      res.json(log);
    } catch (error) {
      console.error("Error listing logs:", error);
      res.status(500).json({ error: "Error listing logs" });
    }
  },

  // Listar un log por su ID-------------------------------------------
  listlogsbyid: async (req, res) => {
    const { id } = req.params;
    try {
      const log = await logs.findById(id);
      if (!log) return res.status(404).json({ error: "Log not found" });

      console.log("Log found:", log);
      res.json(log);
    } catch (error) {
      console.error("Error listing log by ID:", error);
      res.status(500).json({ error: "Error listing log by ID" });
    }
  },

  // Crear nuevo log-------------------------------------------------
  addlog: async (req, res) => {
    const { users, email, action, information } = req.body;
    try {
      const newLog = new logs({ users, email, action, information });
      const result = await newLog.save();
      console.log("Log created:", result);
      res.json(result);
    } catch (error) {
      console.error("Error creating log:", error);
      if (error.code === 11000) {
        res.status(400).json({ error: "Email already exists" });
      } else {
        res.status(500).json({ error: "Error creating log" });
      }
    }
  },

 // Activar un log por su ID-------------------------------------------
 enablelogsbyid: async (req, res) => {
  const { id } = req.params;
  try {
    const log = await logsModel.findByIdAndUpdate(id, { status: 1 }, { new: true });
    if (!log) return res.status(404).json({ error: "Log not found" });
    
    res.json({ msg: "Log status enabled successfully", log });
  } catch (error) {
    console.error("Error enabling log status:", error);
    res.status(500).json({ error: "Error enabling log status" });
  }
},

// Desactivar un log por su ID---------------------------------------
disablelogsbyid: async (req, res) => {
  const { id } = req.params;
  try {
    const log = await logsModel.findByIdAndUpdate(id, { status: 0 }, { new: true });
    if (!log) return res.status(404).json({ error: "Log not found" });
    
    res.json({ msg: "Log status disabled successfully", log });
  } catch (error) {
    console.error("Error disabling log status:", error);
    res.status(500).json({ error: "Error disabling log status" });
  }
},


};

export default logController;
