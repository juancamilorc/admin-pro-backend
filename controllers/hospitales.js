const { response } = require('express');

const Hospital = require('../models/hospital');

const getHospitales = async( req, res = response ) => {

    const hospitales = await Hospital.find()
                                        .populate('usuario','nombre img')  //Para conocer argumentos del usuario que creo el hospital
     
    res.json({
        ok: true,
        hospitales
    })
}

const crearHospital = async ( req, res = response ) => {

    const uid = req.uid;
    const hospital = new Hospital ( { usuario: uid, ...req.body} );

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
     
    
}

const actualizarHospital = async( req, res = response ) => {

    const id  = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById( id );

        if ( !hospital ) {
            return res.status(400).json({
                ok: false,
                msg: 'Hospital no encontrado',
            });
        }

        const cambioshospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambioshospital, { new : true });

        res.json({
            ok: true,
            hospital: hospitalActualizado
        }) 
    } catch (error) {

        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const BorrarHospital = async( req, res = response ) => {
     
    const id  = req.params.id;

    try {

        const hospital = await Hospital.findById( id );

        if ( !hospital ) {
            return res.status(400).json({
                ok: false,
                msg: 'Hospital no encontrado',
            });
        }

        await Hospital.findByIdAndDelete ( id );

        res.json({
            ok: true,
            msg: 'Hospital Eliminado'
        }) 
    } catch (error) {

        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    BorrarHospital
}