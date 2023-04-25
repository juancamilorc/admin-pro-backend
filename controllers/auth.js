const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { GoogleVerify } = require('../helpers/google-verify');
const { getMenuFrontend } = require('../helpers/menu-frontend')


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //Verificar email
        const usuarioDB = await Usuario.findOne({email});

        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            })
        }


        //Generar el TOKEN = JWT
        const token = await generarJWT( usuarioDB.id );
        
    
        res.json({
            ok: true,
            token,
            menu: getMenuFrontend( usuarioDB.role )
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const googleSignIn = async(req, res = response) => { 

    try {
        const { email, name, picture } = await GoogleVerify (req.body.token);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if(!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        }else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        //Guardar usuario
        await usuario.save();

        //Generar el TOKEN = JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true, 
            email, name, picture,
            token,
            menu: getMenuFrontend( usuarioDB.role )

        })

    } catch (error) {     
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de google es incorrecto'
        });
    }



}


const renewToken = async( req, res = response ) => {

    const uid = req.uid;

    //Generar el TOKEN = JWT
    const token = await generarJWT( uid );

    //Obtener el usuario por UID
    const usuario = await Usuario.findById( uid );

    res.json({
        ok: true,
        token,
        usuario,
        menu: getMenuFrontend( usuario.role )
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}