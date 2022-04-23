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

exports.nuevoProyecto = (req, res)=> {
   console.log(req.body)

   // validacion manual 
   const {nombre} = req.body;
   let errores = []

   if(!nombre){
      errores.push({'texto': 'Agrega un nombre al proyecto'})
   }

   if(errores.length>0){
      res.render('nuevoProyecto', {nombrePagina  : 'Nuevo Proyecto', errores})   
   }

}