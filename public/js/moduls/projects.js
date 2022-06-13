import Swal from 'sweetalert2';
import axios from 'axios';

const btnDel = document.querySelector('#del-project');
if(btnDel){
    btnDel.addEventListener('click', e => {
        const projectUrl = e.target.dataset.projectUrl;
        
        
        Swal.fire({
            title: 'Deseas borrar este proyecto?',
            text: "Un proyecto eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar!',
            cancelButtonText: "No, Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
              // abstraccion de url
              const url = `${location.origin}/proyectos/${projectUrl}`
              
              // envio de petición axios
              axios.delete(url, {params: {projectUrl}})
                // peticion exitosa
                .then(function(res){
                    Swal.fire(
                        'Eliminado!',
                        res.data,
                        'success'
                        );
                        // Redireccionar al inicio
                        setTimeout(() => {
                            window.location.href ='/'
                        }, 3000 );
                })
                // peticion erronea
                .catch(() => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: 'No se pudo eliminar el proyecto' 
                  })
                })        
            }
          })
    })
}

export default btnDel;