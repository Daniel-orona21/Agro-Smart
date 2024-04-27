const mongoose = require('mongoose');

const invernaderoSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    pez: { type: mongoose.Schema.Types.ObjectId, ref: 'Pez' },
    cultivo: { type: String, required: true },
    capacidad: { type: String, required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: Boolean, required: true },
    fechaAlta: { type: Date, required: true },
    fechaBaja: { type: Date }
  });
  
  const Invernadero = mongoose.model('Invernadero', invernaderoSchema);

  module.exports = Invernadero;