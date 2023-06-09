const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken')
const bcrypt= require('bcrypt');
const { validationResult } = require('express-validator');

exports.autenticarUsuario = async (req, res, next) =>
{
    // revisar si hay errores
    // Mostrar mensajes de error de express validator
    const errores = validationResult(req);
    
    if(!errores.isEmpty())
    {
        return res.status(400).json({errores: errores.array()});
    }

    // Buscar el usuario para ver si está autenticado
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({email});

    if(!usuario)
    {
        res.status(401).json({msg: 'El usuario no existe'});
        return next();
    }

    // Verificar el password y autenticar el usuario
    if(bcrypt.compareSync(password, usuario.password))
    {
        // Crear JWT
        const token = jwt.sign(
            {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email
            },
            process.env.SECRETA,
            {
                expiresIn: '8h'
            }
        );

        res.json({token});
    }
    else
    {
        res.status(401).json({msg: "Contraseña incorrecta"});
        return next();
    }
}

exports.usuarioAutenticado = (req, res, next) =>
{
    res.json({usuario: req.usuario});
}