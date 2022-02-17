const express = require('express');
const controlCursos = require('../controllers/cursos.controllers');
const md_Autenticacion = require('../middlewares/autenticacion');
const api = express.Router();

api.post('/agregarCursos', md_Autenticacion.Auth, controlCursos.AgregarCurso);
api.get('/obtenerCursos', md_Autenticacion.Auth, controlCursos.EncontrarCurso);
api.put('/editarCursos/:idCursos', md_Autenticacion.Auth, controlCursos.editCursos);
api.delete('/eliminarCursos/:idCursos', md_Autenticacion.Auth, controlCursos.DeleteCursos);

module.exports = api;