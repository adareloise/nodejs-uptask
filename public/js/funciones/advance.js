import Swal from 'sweetalert2';

export const advanceUpdate = () => {
    // Seleccionar tareas existentes
    const tasks = document.querySelectorAll('li.tarea');

    if(tasks.length){
        // Seleccionar tareas completadas
        const tasksComplete = document.querySelectorAll('i.completo');
        // calcular avance
        const advance = Math.round(( tasksComplete.length / tasks.length ) * 100 );
        // mostrar avance 
        const porcentaje = document.querySelector('#porcentaje');
        porcentaje.style.width = advance + '%';

        if( advance === 100){
            Swal.fire(
                'Completaste el Proyecto!',
                'Felicidad, haz terminado tus tareas',
                'success'
            );

        }
    }

}
