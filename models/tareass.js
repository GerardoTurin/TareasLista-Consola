import Tarea from './tarea.js';

class Tareas {

    _listado = {};

    get listadoArr() {

        const listadoArr = [];
        Object.keys(this._listado).map( key => {
            const tarea = this._listado[key];
            listadoArr.push(tarea);
        });
        return listadoArr;
    }

    constructor() {
        this._listado = {};
    }


    cargarTareasArr( tareas = []) {
        tareas.map( tarea => {
            this._listado[tarea.id] = tarea;
        } );
    }


    crearTarea(descripcion = '') {
        const tarea = new Tarea(descripcion);
        this._listado[tarea.id] = tarea;
    }


    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
            
    }


    tareasCompletadas() {
        console.log();
        this.listadoArr.map( (tarea, idx) => {
            const idxTarea = `${idx + 1}`.green;
            const { descripcion, completadoFecha } = tarea;
            const estado = ( completadoFecha ) 
                            ? 'Completada'.green
                            : 'Pendiente'.red;
            
            console.log(`${idxTarea} - ${descripcion} : ${estado}`);
        });
    }

    listarPendientesCompletadas(Completadas = true) {

        console.log();
        let constador = 0;

        this.listadoArr.map( (tarea) => {
            const { descripcion, completadoFecha } = tarea;
            const estado = ( completadoFecha ) 
                            ? 'Completada'.green
                            : 'Pendiente'.red;

            if ( Completadas ) {
                if (completadoFecha) {
                    constador++;
                    console.log(`${constador.toString().green} - ${descripcion} : ${completadoFecha.green}`);
                }
                    
                } else {
                    if (!completadoFecha) {
                        constador++;
                        console.log(`${constador.toString().red} - ${descripcion} : ${estado}`);
                    }
            }
        } );
    }


    toggleCompletadas(ids = []) {
        ids.map( id => {
            const tarea = this._listado[id];
            if (!tarea.completadoFecha) {
                tarea.completadoFecha = new Date().toISOString();
            }
        });

        this.listadoArr.map( (tarea) => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoFecha = null;
            }
        });
        
    }
}






export default Tareas;