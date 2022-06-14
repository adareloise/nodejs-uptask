import Swal from 'sweetalert2';
import axios from "axios";

const tasks = document.querySelector('.listado-pendientes');

if(tasks){
    tasks.addEventListener('click', e => {
        if(e.target.classList.contains("fa-check-circle")){
            const icon = e.target;
            const taskId = icon.parentElement.parentElement.dataset.task;
            
            // Mapping url
            const url = `${location.origin}/tareas/${taskId}`;
            
            // patch request 
            axios.patch(url, { taskId })
                .then(function(res){
                    if(res.status === 200){
                        icon.classList.toggle('completo');
                    }
                })

        }

        if(e.target.classList.contains("fa-trash")){
            const taskHTML = e.target.parentElement.parentElement;
            const taskId = taskHTML.dataset.task;

            // Mapping url
            const url = `${location.origin}/tareas/${taskId}`; 

            Swal.fire({
                title: 'Deseas borrar esta tarea?',
                text: "Una tarea eliminada no se puede recuperar!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Borrar!',
                cancelButtonText: "No, Cancelar"
              }).then((result) => {
                if (result.value) {
                    // Delete request  
                    axios.delete(url, {params: { taskId }})
                    .then(function(res){
                        console.log(res);

                        /*if(res.status === 200){
                            icon.classList.toggle('completo');
                        }*/
                    })
                }
              })
            
        }   

    });
}

export default tasks;