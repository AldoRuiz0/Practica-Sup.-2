const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const asigSchema = new Schema({
    idCurso: { type: Schema.Types.ObjectId, ref: 'Cursos' },
    idUsuario: { type: Schema.Types.ObjectId, ref: 'Usuarios' },
    ContadorAsig: Number
})

module.exports = mongoose.model('Asignaciones', asigSchema);