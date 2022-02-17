const express = require('express');
const controladorUsuario = require('../controllers/usuarios.controllers');
const md_autenticacion = require('../middlewares/autenticacion')
const api = express.Router();

api.post('/registrarMaestro', controladorUsuario.RegistroMaestro);
api.post('/registrarAlumno', controladorUsuario.RegistroAlumno);
api.post('/login',md_autenticacion.Auth, controladorUsuario.Login);
api.put('/editarUsuarios/:idUsuarios', md_autenticacion.Auth, controladorUsuario.editarUser);
api.delete('/eliminarUsuarios/:idUsuarios', md_autenticacion.Auth, controladorUsuario.eliminarUser);

module.exports = api;