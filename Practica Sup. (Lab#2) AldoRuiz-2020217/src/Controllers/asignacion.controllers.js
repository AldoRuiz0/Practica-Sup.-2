const Asignaciones = require('../models/asignacion.models');

function agregarAsignacion(req, res) {
    var parametros = req.body;
    var modeloAsignacion = new Asignaciones();

    if (req.user.rol == 'alumno') {
        if (parametros.idCurso && parametros.idUsuario) {
            modeloAsignacion.idCurso = req.user.sub;
            modeloAsignacion.idUsuario = parametros.idUsuario;
            modeloAsignacion.ContadorAsig + 1;

            if (parametros.ContadorAsig < 3) {
                modeloAsignacion.save((err, asignacionGuardada) => {
                    if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                    if (!asignacionGuardada) return res.status(500).send({ mensaje: 'Error al agregar asignacion' });
                    return res.status(200).send({ asignacion: asignacionGuardada });
                })
            } else {
                return res.status(500).send({ mensaje: 'Ya tiene el maximo de cursos' });
            }
        } else {
            return res.status(500).send({ mensaje: 'Faltan datos' });
        }

    } else {
        return res.status(500).send({ mensaje: 'Debe ingresar los parametros obligatorios' })
    }

}


function encontrarAsignacion(req, res) {
    if (req.user.rol == 'maestro') {
        Cursos.find({}, (err, cursosEncontrados) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!cursosEncontrados) return res.status(500).send({ mensaje: 'Error al obtener las cursos' });
            return res.status(200).send({ cursos: cursosEncontrados });
        }).populate('idUsuario', 'nombres');
    }

}

function editAsignacion(req, res) {
    var idCur = req.params.idCursos;
    var parametros = req.body;

    if (req.user.rol == 'maestro') {
        Cursos.findByIdAndUpdate(idCur, parametros, { new: true }, (err, cursosEditados) => {
            if (err) return res.status(500).send({ mensaje: 'Error en  la peticion' });
            if (!cursosEditados) return res.status(403).send({ mensaje: 'Error al editar el cursos' });
            return res.status(200).send({ cursos: cursosEditados });
        })
    } else {
        return res.status(500).send({ mensaje: 'No tiene los permisos' });
    }

}

function deleteAsignacion(req, res) {
    var idCur = req.params.idCursos;

    Cursos.findByIdAndDelete(idCur, (err, cursoEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!cursoEliminado) return res.status(500).send({ mensaje: 'Error al eliminar el curso' });
        return res.status(200).send({ curso: cursoEliminado });
    })
}

module.exports = {
    agregarAsignacion,
    encontrarAsignacion,
    editAsignacion,
    deleteAsignacion
}