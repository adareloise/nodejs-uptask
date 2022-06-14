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

exports.changeState = async (req, res, next) => {
    const {id} = req.params;
    const task = await Tasks.findOne({ where: {id} })

    //Confirm status
    let status = 0;
    
    if(task.estado === status){
        status = 1;
    }

    task.estado = status;

    const result = await task.save();

    if(!result) return next();

    res.status(200).send('Actualizado');
}

exports.deleteTask = async (req, res, next) => {
    const {id} = req.params;

    //Confirm status
    const result = await Tasks.destroy({ where: { id } });

    if(!result) return next();

    res.status(200).send('Eliminado correctamente');
}