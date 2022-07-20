import colors from 'colors';
import inquirer from 'inquirer';



const preguntaOptions = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿ Que desea hacer ?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear nueva tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas Completadas`

            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas Pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Eliminar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }
        ]
    }
];



const inquirerMenu = async () => {
    
    console.clear();
    console.log('========================='.green);
    console.log(' Seleccione una opción: ');
    console.log('=========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntaOptions);

    return opcion;
}


const pausa = async () => {

    const preguntaPausa = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar\n`
        }
    ];

    console.log('\n');
    await inquirer.prompt(preguntaPausa);
}


const leerInput = async (mensaje) => {
    const preguntaInput = [
        {
            type: 'input',
            name: 'descripcion',
            message: mensaje,
            validate: (value) => {
                if (value.length) {
                    return true;
                } else {
                    return 'Debe ingresar un valor';
                }
            }
        }
    ];

    const { descripcion } = await inquirer.prompt(preguntaInput);
    return descripcion;
}



const listadoBorrarTarea = async (tareas = []) => {

    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`
        }
    });


    choices.unshift({
        value: '0',
        name: `${'0.'.green} ${'Cancelar'.red}`

    });


    const preguntaBorrarTarea = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices: choices
        }
    ];
    const { id } = await inquirer.prompt(preguntaBorrarTarea);
    return id;
}



const confirmar = async (mensaje) => {
    const preguntaConfirmar = [
        {
            type: 'confirm',
            name: 'ok',
            message: mensaje
        }
    ];

    const { ok } = await inquirer.prompt(preguntaConfirmar);
    return ok;
}


const listaTareasCompletar = async (tareas = []) => {
    
        const choices = tareas.map( (tarea, i) => {

            const idx = `${i + 1}.`.green;
            return {
                value: tarea.id,
                name: `${idx} ${tarea.descripcion}`,
                checked: (tarea.completadoFecha) ? true : false
            }
        });

        const preguntaTareasCompletar = [
            {
                type: 'checkbox',
                name: 'ids',
                message: 'Seleccione las tareas que desea completar',
                choices: choices
            }
        ]

        const { ids } = await inquirer.prompt(preguntaTareasCompletar);
        return ids;
} 



export {
    inquirerMenu,
    pausa,
    leerInput,
    listadoBorrarTarea,
    confirmar,
    listaTareasCompletar
};