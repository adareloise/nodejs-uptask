const Projects = require('../models/Projects')

exports.projectHome = async (req, res)=> {
   const projects  = await Projects.findAll();
   
   res.render('index', {
      nombrePagina: 'Proyectos ' + res.locals.year,
      projects
   });    
}

exports.projectForm = async (req, res)=> {
   const projects  = await Projects.findAll();
  
   res.render('new-project', {
         nombrePagina: 'Proyectos', projects
   });
}

exports.ProjectNew  = async (req, res)=> {

   const projects  = await Projects.findAll();
   // validacion manual 
   const {nombre} = req.body;
   let errores = []

   if(!nombre){
      errores.push({'texto': 'Agrega un nombre al proyecto'})
   }else{
      
      const project  = await Projects.create({nombre});
      res.redirect('/');
      project
   }  
   if(errores.length>0){
      res.render('new-project', {
         nombrePagina  : 'Nuevo Proyecto', 
         errores, projects
      })   
   }else{
      // insert
      
   } 
}

exports.projectUrl = async (req, res, next) => {
   const projects  = await Projects.findAll();

   const project = Projects.findOne({
      where: {
         url: req.params.url
      }
   });
   if(!project) return next();

   // reder a la vista 

   res.render('tasks', {
      nombrePagina : 'Tareas del Proyecto',
      project, projects
   })
}