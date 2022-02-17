const Cursos = require('../models/cursos.models');
const Asignacion = require('../models/asignacion.models');

function AgregarCurso(req, res) {
    var parametros = req.body;
    var modeloCursos = new Cursos();

    if (req.user.rol == 'maestro') {
        if (parametros.nombre) {
            modeloCursos.nombre = parametros.nombre;
            modeloCursos.idMaestro = req.user.sub;

            modeloCursos.save((err, cursoGuardado) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                if (!cursoGuardado) return res.status(500).send({ mensaje: 'Error al agregar curso' });

                return res.status(200).send({ cursos: cursoGuardado });
            })
        }
    } else {
        return res.status(500).send({ mensaje: 'Debe ingresar los parametros obligatorios' })
    }

}

function EncontrarCurso(req, res) {
    if (req.user.rol == 'maestro') {
        Cursos.find({}, (err, cursoEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!cursoEncontrado) return res.status(500).send({ mensaje: 'Error al obtener las cursos' });
            return res.status(200).send({ cursos: cursoEncontrado });
        }).populate('idMaestro', 'nombres');
    }

}

function editCursos(req, res) {
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

function DeleteCursos(req, res) {
    var idCur = req.params.idCursos;
    var Asignacion = new Asignacion();

    Asignacion.idCurso = '620d231ee13eba221af0a9e5'
    Asignacion.idMaestro = '620d2e870287c33039ce4829';

    Asignacion.save((err, cursoE) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!cursoE) return res.status(500).send({ mensaje: 'Error al agregar al nuevo curso' });

        else {
            Cursos.findByIdAndDelete(idCur, (err, deletedCurso) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                if (!deletedCurso) return res.status(500).send({ mensaje: 'Error al eliminar el curso' });
                else {
                    Asignacion.find({ idCurso: idCur }, (err, cursos) => {
                        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                        if (!cursos) return res.status(500).send({ mensaje: 'Error al eliminar el curso' })

                        else {
                            cursos.forEach(element => {
                                Asignacion.findByIdAndDelete(element._id, (err, deletedAsignacion) => {
                                    if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                                    if (!deletedAsignacion) return res.status(500).send({ mensaje: 'Error al eliminar el curso' })
                                })
                            });
                        } return res.status(200).send({ mensaje: 'Eliminacion Completa' });

                    })
                }
            })
        }
    })


}

module.exports = {
    AgregarCurso,
    EncontrarCurso,
    editCursos,
    DeleteCursos
}