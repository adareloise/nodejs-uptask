// Imports
const Projects = require('../models/Projects')
const Tasks = require('../models/Tasks')

// Add Task
exports.addTask = async (req, res, next) => {
    
    // abstract data project
    const project = await Projects.findOne({
        where: {url: req.params.url }
    }) 

    // abstract form value
    const {tarea} = req.body;
    console.log(tarea)
    // Mapping
    const  estado = 0;
    const  proyectoId = project.id;

    // Insert
    const result = await Tasks.create({ tarea, estado, proyectoId });

    if(!result){
        return next();
    }

    // Render
    res.redirect(`/proyectos/${req.params.url}`)
}