const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const auth = require('../middleware/auth.js');

router.post('/',
    [
        check('email', 'Correo no válido').isEmail(),
        check('password', 'La contraseña no puede estar vacía').not().isEmpty(),
    ],  
    authController.autenticarUsuario
);

router.get('/',
    auth,
    authController.usuarioAutenticado
);

module.exports = router;