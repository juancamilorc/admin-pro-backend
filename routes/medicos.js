/* 
    Medicos
    ruta: '/api/medico'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campo');

const { validarJWT } = require('../middlewares/validar-jwt');

const { getMedicos, crearMedico, actualizarMedico, BorrarMedico } = require ('../controllers/medicos');

const router = Router();

router.get( '/', getMedicos );

router.post('/', 
    [ 
        validarJWT,
        check ('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check ('hospital', 'El ID del hospital debe ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico 
);

router.put( '/:id',
    [
        validarJWT,
        check ('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check ('hospital', 'El ID del hospital debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarMedico
 );

 router.delete( '/:id',
 BorrarMedico
 );


module.exports = router;