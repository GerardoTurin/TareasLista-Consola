import { writeFileSync, existsSync, readFileSync } from 'fs';

const archivo = './database/data.json';

const guardarInfo = ( data ) => {
    writeFileSync( archivo, JSON.stringify( data ) );
}

const LeerInfo = () => {

    if (!existsSync(archivo)) {
        return null;
    }

    const info = readFileSync(archivo, 'utf-8');
    const data = JSON.parse(info);
    console.log(data);

    return data;
}


export {
    guardarInfo,
    LeerInfo
};