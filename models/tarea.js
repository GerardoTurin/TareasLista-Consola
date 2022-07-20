import { v4 as uuidv4 } from 'uuid';



class Tarea {

    id = '';
    descripcion = '';
    completadoFecha = null;

    constructor( descripcion ) {
        this.id = uuidv4();
        this.descripcion = descripcion;
    }
}



export default Tarea;