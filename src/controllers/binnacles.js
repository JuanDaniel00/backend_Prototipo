import Binnacles from "../models/binnacles.js";
import Register from "../models/register.js";

const controllerBinnacles = {
  // Listar bitácoras-------------------------------------------------------------------
  listallbinnacles: async (req, res) => {
    try {
      const binnacles = await Binnacles.find()
        .populate({
          path: 'register',
          populate: {
            path: 'idApprentice'
          }
        });
      console.log("Lista de bitácoras", binnacles);
      res.json(binnacles);
    } catch (error) {
      console.error("Error al listar bitácoras", error);
      res.status(500).json({ message: "Error al listar bitácoras" });
    }
  },

  // Listar bitácoras por id-------------------------------------------------------
  listbinnaclesbyid: async (req, res) => {
    const { id } = req.params;
    try {
      const binnacle = await Binnacles.findById(id);
      if (!binnacle) {
        return res.status(404).json({ message: "Bitácora no encontrada" });
      }
      console.log("Bitácora encontrada", binnacle);
      res.json(binnacle);
    } catch (error) {
      console.error("Error al listar bitácora por id", error);
      res.status(500).json({ message: "Error al listar bitácora por id" });
    }
  },

  listBinnaclesByRegister: async (req, res) => {
    const { register } = req.params;
    try {
      const binnacles = await Binnacles.find({ register: register })
      .populate({
        path: 'register',
        populate: {
          path: 'idApprentice'
        }
      })
      if (binnacles.length === 0) {
        return res.status(404).json({ message: `No se encontraron bitácoras para el registro ${register}` });
      }
      console.log(`Bitácoras del registro ${register}:`, binnacles);
      res.json({
        message: `Bitácoras encontradas para el registro ${register}`,
        totalBinnacles: binnacles.length,
        binnacles,
      });
    } catch (error) {
      console.error(`Error al listar bitácoras del registro ${register}:`, error);
      res.status(500).json({ error: `Error al listar bitácoras del registro ${register}` });
    }
  },

  // Listar instructores en bitácoras--------------------------------------------------------------
  listbinnaclesbyinstructor: async (req, res) => {
    const { idinstructor } = req.params;
    try {
      const binnacles = await Binnacles.find({ "instructor.idinstructor": idinstructor })
      .populate({
        path: 'register',
        populate:{
          path: 'idApprentice'
        }
      })
      if (!binnacles || binnacles.length === 0) {
        return res.status(404).json({ error: 'No se encontraron bitácoras para este instructor' });
      }
      console.log(`Lista de instructores en bitácoras ${idinstructor}:`, binnacles);
      res.json(binnacles);
    } catch (error) {
      console.error(`Error al listar instructores en bitácoras ${idinstructor}:`, error);
      res.status(500).json({ error: `Error al listar instructores de bitácoras ${idinstructor}` });
    }
  },

  // Insertar bitácoras (solo para generar la bitácora sin observaciones)
  addbinnacles: async (req, res) => {
    const { register, instructor, number, document } = req.body;
    try {
      const existingBinnacle = await Binnacles.findOne({ number });
      if (existingBinnacle) {
        return res.status(400).json({ error: "El número de bitácora ya existe" });
      }
      const registerRecord = await Register.findById(register);
      if (!registerRecord) {
        return res.status(400).json({ error: "No se encontró el registro asociado a la asignación" });
      }
      const activeFollowUpInstructor = registerRecord.assignment.some(a =>
        a.followUpInstructor.some(f =>
          f.idInstructor.toString() === instructor.idinstructor.toString() && f.status === 1
        )
      );
      if (!activeFollowUpInstructor) {
        return res.status(400).json({ error: "El instructor proporcionado no está activo como instructor de seguimiento en la asignación" });
      }
      const binnacle = new Binnacles({
        register,
        instructor: {
          idinstructor: instructor.idinstructor,
          name: instructor.name
        },
        number,
        document,
        status: '1',
      });
      const result = await binnacle.save();
      const updatedBinnacle = await Binnacles.findByIdAndUpdate(
        result._id,
        { status: '2' },
        { new: true }
      );
      console.log("Bitácora guardada y actualizada a ejecutado", updatedBinnacle);
      await registerRecord.save();
      res.status(201).json(updatedBinnacle);
    } catch (error) {
      console.error("Error al insertar bitácora", error);
      res.status(500).json({ error: "Error al insertar bitácora" });
    }
  },

  // Actualizar bitácora---------------------------------------------------------
  updatebinnaclebyid: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedBinnacle = await Binnacles.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!updatedBinnacle) {
        return res.status(404).json({ error: "Bitácora no encontrada" });
      }

      console.log("Bitácora actualizada:", updatedBinnacle);
      res.json(updatedBinnacle);
    } catch (error) {
      console.error("Error al actualizar bitácora:", error);
      res.status(500).json({ error: "Error al actualizar bitácora" });
    }
  },

  // Actuactulizar un El estado del 1,2,3,4
  updatestatus: async (req, res) => {
    const { id, status } = req.params;
    try {
      const statusSelect = [1, 2, 3, 4];
      if (!statusSelect.includes(parseInt(status))) {
        return res.status(400).json({ error: "Estado inválido" });
      }
      const updatedBinnacle = await Binnacles.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      if (!updatedBinnacle) {
        return res.status(404).json({ error: "Bitácora no encontrada" });
      }
      res.json(updatedBinnacle);
    } catch (error) {
      console.error("Error al actualizar estado de Bitácora", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  updateCheckProjectInstructor: async (req, res) => {
    const { id } = req.params;
    try {
      const binnacle = await Binnacles.findById(id);
      if (!binnacle) {
        return res.status(404).json({ error: "Bitácora no encontrada" });
      }
      if (binnacle.checkProjectInstructor) {
        return res.status(400).json({ error: "El check de proyecto ya está actualizado" });
      }
      binnacle.checkProjectInstructor = true;
      await binnacle.save();
      const register = await Register.findById(binnacle.register).populate("idModality");
      if (!register) {
        return res.status(404).json({ error: "Registro no encontrado" });
      }
      const modality = register.idModality;
      if (!modality) {
        return res.status(400).json({ error: "El registro no tiene una modalidad asociada" });
      }
      const hoursProject = modality.hourInstructorProject;
      if (!hoursProject) {
        return res.status(400).json({
          error: "No se definieron horas de proyecto para esta modalidad",
        });
      }
      const hoursPerBinnacle = hoursProject / 6 / 2;
      const projectInstructors = register.assignment.flatMap(assign => assign.projectInstructor);
      if (!projectInstructors || projectInstructors.length === 0) {
        return res.status(400).json({ error: "No hay instructores de proyecto asignados" });
      }
      projectInstructors.forEach(instructor => {
        if (!Array.isArray(register.ProyectHourPending)) {
          register.ProyectHourPending = [];
        }
        register.ProyectHourPending.push({
          idInstructor: instructor.idInstructor,
          name: instructor.name,
          hour: hoursPerBinnacle,
        });
      });
      await register.save();
      res.json({
        message: "Horas de proyecto asignadas correctamente",
        register,
      });
    } catch (error) {
      console.error("Error al asignar horas de proyecto:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },


  updateCheckTechnicalInstructor: async (req, res) => {
    const { id } = req.params;
    try {
      const binnacle = await Binnacles.findById(id);
      if (!binnacle) {
        return res.status(404).json({ error: "Bitácora no encontrada" });
      }
      if (binnacle.checkTechnicalInstructor) {
        return res
          .status(400)
          .json({ error: "El check técnico ya está actualizado" });
      }
      binnacle.checkTechnicalInstructor = true;
      await binnacle.save();
      const register = await Register.findById(binnacle.register).populate(
        "idModality"
      );
      if (!register) {
        return res.status(404).json({ error: "Registro no encontrado" });
      }
      const modality = register.idModality;
      if (!modality) {
        return res
          .status(400)
          .json({ error: "El registro no tiene una modalidad asociada" });
      }
      const hoursTechnical = modality.hourInstructorTechnical;
      if (!hoursTechnical) {
        return res.status(400).json({
          error: "No se definieron horas técnicas para esta modalidad",
        });
      }
      const hoursPerBinnacle = hoursTechnical / 6 / 2;
      const technicalInstructors = register.assignment.flatMap(
        (assign) => assign.technicalInstructor
      );
      if (!technicalInstructors || technicalInstructors.length === 0) {
        return res.status(400).json({
          error: "No hay instructores técnicos asignados",
        });
      }
      technicalInstructors.forEach((instructor) => {
        if (!Array.isArray(register.technicalHourPending)) {
          register.technicalHourPending = [];
        }
        register.technicalHourPending.push({
          idInstructor: instructor.idInstructor,
          name: instructor.name,
          hour: hoursPerBinnacle,
        });
      });
      await register.save();
      res.json({
        message: "Horas técnicas asignadas correctamente",
        register,
      });
    } catch (error) {
      console.error("Error al asignar horas técnicas:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },


  validateHoursTechnical: async (req, res) => {
    const { id } = req.params;
    try {
      const binnacle = await Binnacles.findById(id);
      if (!binnacle) {
        return res.status(404).json({ error: "Bitácora no encontrada" });
      }
      const register = await Register.findById(binnacle.register).populate("idModality");
      if (!register) {
        return res.status(404).json({ error: "Registro no encontrado" });
      }
      const modality = register.idModality;
      if (!modality) {
        return res.status(400).json({ error: "El registro no tiene una modalidad asociada" });
      }
      const hoursTechnical = modality.hourInstructorTechnical;
      if (!hoursTechnical) {
        return res.status(400).json({
          error: "No se definieron horas técnicas para esta modalidad",
        });
      }
      const hoursPerBinnacle = hoursTechnical / 6 / 2;
      if (!Array.isArray(register.productiveTechnicalHourExcuted)) {
        register.productiveTechnicalHourExcuted = [];
      }
      const technicalInstructors = register.assignment
        .flatMap(assign => assign.technicalInstructor)
        .filter(instructor => instructor.status !== 0);
      if (technicalInstructors.length === 0) {
        return res.status(400).json({ error: "No hay instructores técnicos activos asignados" });
      }
      if (binnacle.checkTechnicalInstructor) {
        if (!Array.isArray(register.technicalHourPending)) {
          register.technicalHourPending = [];
        }
        technicalInstructors.forEach(instructor => {
          const pendingHours = register.technicalHourPending.find(
            item => item.idInstructor.toString() === instructor.idInstructor.toString()
          );

          if (pendingHours && pendingHours.hour > 0) {
            register.productiveTechnicalHourExcuted.push({
              idInstructor: instructor.idInstructor,
              name: instructor.name,
              hour: pendingHours.hour,
            });
          }
        });
        register.technicalHourPending = [];
      } else {
        binnacle.checkTechnicalInstructor = true;

        technicalInstructors.forEach(instructor => {
          register.productiveTechnicalHourExcuted.push({
            idInstructor: instructor.idInstructor,
            name: instructor.name,
            hour: hoursPerBinnacle,
          });
        });
      }
      await binnacle.save();
      await register.save();
      return res.json({
        message: "Horas técnicas procesadas correctamente",
        register,
      });
    } catch (error) {
      console.error("Error al validar horas técnicas:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  validateHoursProject: async (req, res) => {
    const { id } = req.params;
    try {
      const binnacle = await Binnacles.findById(id);
      if (!binnacle) {
        return res.status(404).json({ error: "Bitácora no encontrada" });
      }
      const register = await Register.findById(binnacle.register).populate("idModality");
      if (!register) {
        return res.status(404).json({ error: "Registro no encontrado" });
      }
      const modality = register.idModality;
      if (!modality) {
        return res.status(400).json({ error: "El registro no tiene una modalidad asociada" });
      }
      const hoursProject = modality.hourInstructorProject;
      if (!hoursProject) {
        return res.status(400).json({ error: "No se definieron horas de proyecto para esta modalidad" });
      }
      const hoursPerBinnacle = hoursProject / 6 / 2;
      if (!Array.isArray(register.businessProyectHourExcuted)) {
        register.businessProyectHourExcuted = [];
      }
      const projectInstructors = register.assignment
        .flatMap(assign => assign.projectInstructor)
        .filter(instructor => instructor.status !== 0);

      if (projectInstructors.length === 0) {
        return res.status(400).json({ error: "No hay instructores de proyecto activos asignados" });
      }
      if (binnacle.checkProjectInstructor) {
        if (!Array.isArray(register.ProyectHourPending)) {
          register.ProyectHourPending = [];
        }
        projectInstructors.forEach(instructor => {
          const pendingHours = register.ProyectHourPending.find(
            item => item.idInstructor.toString() === instructor.idInstructor.toString()
          );

          if (pendingHours && pendingHours.hour > 0) {
            register.businessProyectHourExcuted.push({
              idInstructor: instructor.idInstructor,
              name: instructor.name,
              hour: pendingHours.hour,
            });
          }
        });

        register.ProyectHourPending = [];
      } else {
        binnacle.checkProjectInstructor = true;
        projectInstructors.forEach(instructor => {
          register.businessProyectHourExcuted.push({
            idInstructor: instructor.idInstructor,
            name: instructor.name,
            hour: hoursPerBinnacle,
          });
        });
      }
      await binnacle.save();
      await register.save();

      return res.json({
        message: "Horas de proyecto procesadas correctamente",
        register,
      });
    } catch (error) {
      console.error("Error al validar horas de proyecto:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },


  addObservation: async (req, res) => {
    const { id } = req.params;
    const { observation } = req.body;

    try {
      const binnacle = await Binnacles.findById(id);

      if (!binnacle) {
        return res.status(404).json({ error: "Bitácora no encontrada" });
      }
      const newObservation = {
        user: req.user,
        observation,
      };
      binnacle.observation.push(newObservation);
      await binnacle.save();

      res.status(201).json({
        message: "Observación agregada con éxito",
        observation: newObservation,
      });
    } catch (error) {
      console.error("Error al agregar observación:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  getObservations: async (req, res) => {
    const { id } = req.params;
    try {
      const binnacle = await Binnacles.findById(id);
      if (!binnacle) {
        return res.status(404).json({ error: "Bitácora no encontrada" });
      }
      res.status(200).json({
        message: "Observaciones recuperadas con éxito",
        observations: binnacle.observation,
      });
    } catch (error) {
      console.error("Error al recuperar observaciones:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

};

export default controllerBinnacles;
