const mongoose = require('mongoose');

const pezSchema = new mongoose.Schema({
  cantidad:{
      type: String,
      require: true
  },
  tipo:{
      type: String,
      require: true,
       
  },
  usuario:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      require: true
  },
});
   
  const Pez = mongoose.model('Pez2', pezSchema);

  module.exports = Pez;