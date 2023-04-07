const express = require("express");
const router = express.Router();
const enlacesController = require('../controllers/enlacesController');
const archivosController = require('../controllers/archivosController');
const { check } = require('express-validator');
const auth = require('../middleware/auth.js');

router.post('/',
    [
        check('nombre', 'Sube un archivo').not().isEmpty(),
        check('nombre_original', 'Sube un archivo').not().isEmpty(),
    ],
    auth,
    enlacesController.nuevoEnlace
);

router.get('/',
    enlacesController.todosEnlaces
);

router.get('/:url',
    enlacesController.tienePassword,
    enlacesController.obtenerEnlace
);

router.post('/:url',
    enlacesController.password,
    enlacesController.obtenerEnlace
)

module.exports = router;