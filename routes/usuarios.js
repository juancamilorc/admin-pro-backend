/*
            Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campo');


const { getUsuarios, crearUsuario, UpdateUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT, validarAdminRole, validarAdminRole_MismoUsuario } = require('../middlewares/validar-jwt');


const router = Router();

router.get( '/', validarJWT ,getUsuarios );

router.post('/', 
    [ 
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        validarCampos
    ],
    crearUsuario 
);

router.put( '/:id',
    [
        validarJWT,
        validarAdminRole_MismoUsuario,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('role','El role es obligatorio').not().isEmpty(),
        validarCampos
    ],
    UpdateUsuario
 );

 router.delete( '/:id',
    [validarJWT, validarAdminRole],
    borrarUsuario
 );


module.exports = router;