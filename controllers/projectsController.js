const Projects = require('../models/Projects')

// Home
exports.projectHome = async (req, res)=> {
   const projects  = await Projects.findAll();
   
   res.render('index', {
      nombrePagina: 'Proyectos ' + res.locals.year,
      projects
   });    
}

// Nuevo formulario
exports.projectForm = async (req, res)=> {
   const projects  = await Projects.findAll();
  
   res.render('new-project', {
         nombrePagina: 'Proyectos', projects
   });
}

// Nuevo proyecto
exports.projectNew  = async (req, res)=> {

   const projects  = await Projects.findAll();
   
   // validacion manual 
   const {nombre} = req.body;
   let errores = []

   if(!nombre){
      errores.push({'texto': 'Agrega un nombre al proyecto'})
   }else{
      await Projects.create({nombre});
      res.redirect('/');
   }  
  
   // Mappeo de errores
   if(errores.length>0){
      res.render('new-project', {
         nombrePagina  : 'Nuevo Proyecto', 
         errores, projects
      })   
   }
}

// Render proyecto por url 
exports.projectUrl = async (req, res, next) => {
   const projectsPromise = Projects.findAll();
   const projectPromise = Projects.findOne({
      where: {
         url: req.params.url
      }
   });

   const [projects, project] = await Promise.all([projectsPromise, projectPromise])

   if(!project) return next();
   
   // reder a la vista 
   res.render('tasks', {
      namePag : 'Tareas del Proyecto',
      project, projects
   })
}

// Editar proyecto existente
exports.projectFormEdit= async (req, res) => {
   const projectsPromise = Projects.findAll();
   const projectPromise = Projects.findOne({
      where: {
         id: req.params.id
      }
   })

   const [projects, project] = await Promise.all([projectsPromise, projectPromise])
   
   // reder a la vista 
   res.render('new-project', {
      namePag : 'Editar Proyecto',
      projects, project
   })  
}

// Nuevo formulario
exports.projectForm = async (req, res)=> {
   const projects  = await Projects.findAll();
  
   res.render('new-project', {
         nombrePagina: 'Proyectos', projects
   });
}

// Nuevo proyecto
exports.projectUpdate  = async (req, res)=> {

   const projects  = await Projects.findAll();
   
   // validacion manual 
   const {nombre} = req.body;
   let errores = []

   if(!nombre){
      errores.push({'texto': 'Agrega un nombre al proyecto'})
   }else{
      //insertar
      await Projects.update(
            {  nombre: nombre },
            {  where:   {id: req.params.id } }   
         );

      res.redirect('/');
   }
   
   // Mappeo de errores
   if(errores.length>0){
      res.render('new-project', {
         nombrePagina  : 'Nuevo Proyecto', 
         errores, projects
      })   
   }
}