require('dotenv').config({path: '.env'});
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>
{
    const authHeader = req.get('Authorization');

    if(authHeader)
    {   
        // Obtener token
        const token = authHeader.split(' ')[1];

        // Comprobar el JWT
        try 
        {
            const usuario = jwt.verify(token, process.env.SECRETA);
            req.usuario = usuario;
        } 
        catch (error) 
        {
            console.log(error);
            console.log('Token no válido');
        }
        
    }

    return next();
}