const express = require('express');
const asignacionCursos = require('../controllers/asignacion.controllers');
const md_Autenticacion = require('../middlewares/autenticacion');
const api = express.Router();

api.post('/agregarAsignacion', md_Autenticacion.Auth, asignacionCursos.agregarAsignacion);
api.get('/obtenerAsignacion', md_Autenticacion.Auth, asignacionCursos.encontrarAsignacion);
api.put('/editarAsignacion/:idAsignacion', md_Autenticacion.Auth, asignacionCursos.editAsignacion);
api.delete('/eliminarAsignacion/:idAsignacion', md_Autenticacion.Auth, asignacionCursos.deleteAsignacion);

module.exports = api;