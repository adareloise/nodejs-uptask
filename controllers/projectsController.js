const Projects = require('../models/Projects')
const Tasks = require('../models/Tasks')

// Home
exports.projectHome = async (req, res)=> {
   const projects  = await Projects.findAll();
   
   res.render('index', {
      nombrePagina: 'Proyectos ' + res.locals.year,
      projects
   });    
}

// Form new project
exports.projectForm = async (req, res)=> {
   const projects  = await Projects.findAll();
  
   res.render('new-project', {
         nombrePagina: 'Proyectos', projects
   });
}

// New project
exports.projectNew  = async (req, res)=> {

   const projects  = await Projects.findAll();
   
   // Validation 
   const {nombre} = req.body;
   let errores = []

   if(!nombre){
      errores.push({'texto': 'Agrega un nombre al proyecto'})
   }else{
      await Projects.create({nombre});
      res.redirect('/');
   }  
  
   // Errors mapping
   if(errores.length>0){
      res.render('new-project', {
         nombrePagina  : 'Nuevo Proyecto', 
         errores, projects
      })    
   }
}

// Find project param url 
exports.projectUrl = async (req, res, next) => {
   const projectsPromise = Projects.findAll();
   const projectPromise = Projects.findOne({
      where: {
         url: req.params.url
      }
   });

   const [projects, project] = await Promise.all([projectsPromise, projectPromise])

   // extract tasks
   const tasks = await Tasks.findAll({
      where: { 
         proyectoId : project.id
      }
   })

   if(!project) return next();
   
   // render to view 
   res.render('tasks', {
      namePag : 'Tareas del Proyecto',
      project, projects, tasks
   })
}

// Edit project
exports.projectFormEdit= async (req, res) => {
   const projectsPromise = Projects.findAll();
   const projectPromise = Projects.findOne({
      where: {
         id: req.params.id
      }
   })

   const [projects, project] = await Promise.all([projectsPromise, projectPromise])
   
   // render to view 
   res.render('new-project', {
      namePag : 'Editar Proyecto',
      projects, project
   })  
}

// Project update param id
exports.projectUpdate  = async (req, res)=> {

   const projects  = await Projects.findAll();
   
   // Validation 
   const {nombre} = req.body;
   let errores = []

   if(!nombre){
      errores.push({'texto': 'Agrega un nombre al proyecto'})
   }else{
      //insert
      await Projects.update(
            {  nombre: nombre },
            {  where:   {id: req.params.id } }   
         );

      res.redirect('/');
   }
   
   // Errors mapping
   if(errores.length>0){
      res.render('new-project', {
         nombrePagina  : 'Nuevo Proyecto', 
         errores, projects
      })   
   }
}

// Delete project
exports.projectDelete = async (req, res, next) => {   
   
   const {projectUrl} = req.query;
   
   const result = await Projects.destroy({
      where: {url: projectUrl}
   })

   // Exception manager
   if(!result){   
      return next();
   }

   res.status(200).send('Proyecto eliminado correctamente')
}