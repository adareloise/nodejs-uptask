const Proyectos = require('../models/Proyectos')

exports.projectsHome = (req, res)=> {
   res.render('index', {
      nombrePagina: 'Proyectos'
   });    
}

exports.formularioProyecto = (req, res)=> {
   res.render('nuevoProyecto', {
         nombrePagina: 'Proyectos'
   });
}

exports.nuevoProyecto  = async (req, res)=> {
   console.log(req.body)

   // validacion manual 
   const {nombre} = req.body;
   let errores = []

   if(!nombre){
      errores.push({'texto': 'Agrega un nombre al proyecto'})
   }else{
      
      const proyectos = await Proyectos.create({nombre});
      res.redirect('/');

   }
   
   if(errores.length>0){
      res.render('nuevoProyecto', {nombrePagina  : 'Nuevo Proyecto', errores})   
   }else{
      // insert
      
   }

}