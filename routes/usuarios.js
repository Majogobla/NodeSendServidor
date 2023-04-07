const express = require("express");
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');
 
router.post('/',
    [
        check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
        check('email', 'Correo no válido').isEmail(),
        check('password', 'La contraseña debe de tener al menos 6 caracteres').isLength({min: 6}),
    ],
    usuarioController.nuevoUsuario
);

module.exports  = router;