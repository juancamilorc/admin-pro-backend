const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const fs = require('fs');  //Con esta importacion de puede leer los arhivos del sistema y poder trabajar con ellos 

const borrarImagen = ( path ) => {
      
    if( fs.existsSync( path )){
        //Borrar la imagen anterior
        fs.unlinkSync( path );
    }
}

const actualizarImagen = async ( tipo, id, nombreArchivo ) => {
    
    switch (tipo) {
        case 'medicos':
            
            //Verificar si el id es de un medico
            const medico = await Medico.findById(id);
            if( !medico ) {
                console.log('No es un medico por id');
                return false;
            }

            const pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;

        break;

        case 'hospitales':

            //Verificar si el id es de un hospital
            const hospital = await Hospital.findById(id);
            if( !hospital ) {
                console.log('No es un hospital por id');
                return false;
            }

            const pathViejoh = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen(pathViejoh);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            
        break;

        case 'usuarios':

            //Verificar si el id es de un medico
            const usuario = await Usuario.findById(id);
            if( !usuario ) {
                console.log('No es un usuario por id');
                return false;
            }

            const pathViejou = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen(pathViejou);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            
        break;
    
        default:
        break;
    }
}

module.exports = {
    actualizarImagen
}