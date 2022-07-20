import colors from 'colors';
import {guardarInfo, LeerInfo} from './helpers/guardarArchivo.js';
import { 
        inquirerMenu,
        pausa,
        leerInput,
        listadoBorrarTarea,
        confirmar,
        listaTareasCompletar
        } from './helpers/inquirer.js';
import Tareas from './models/tareass.js';







const main = async () => {
    
    let opcion = '';   // Opción seleccionada por el usuario
    const tareas = new Tareas();    // Instancia de la clase Tareas

    const tareasDB = LeerInfo();

    if (tareasDB) {
        // Establecemos el listado de tareas
        tareas.cargarTareasArr(tareasDB);
    }
    

    do {        
        opcion = await inquirerMenu();  // Seleccionar opción( MuestraMenú )
        
        switch (opcion) {
            case '1':   // Agregar tarea
                const descripcion = await leerInput('Descripción:');
                tareas.crearTarea(descripcion);
                break;
            case '2':   // Listar tareas
                tareas.tareasCompletadas();
                break;
            case '3':   // Listar tareas completadas
                tareas.listarPendientesCompletadas();
                break;
            case '4':   // Listar tareas Pendientes
                tareas.listarPendientesCompletadas(false);
                break;

            case '5':   // Completar tarea
                const ids = await listaTareasCompletar(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':   // Eliminar tarea
                const id = await listadoBorrarTarea(tareas.listadoArr);
                if (id !== '0') {
                    const confirmacion = await confirmar('¿ Está seguro de eliminar la tarea ?');
                    
                    if (confirmacion) {
                        tareas.borrarTarea(id);
                        console.log('Tarea Eliminada'.green);
                    }
                }
                break;
                


        }
        guardarInfo(tareas.listadoArr);
        
        await pausa();
    } while (opcion !== '0');

}
main();