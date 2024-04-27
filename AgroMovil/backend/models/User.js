const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  usuario: { type: String }
});

 
const User = mongoose.model('User2', userSchema);

module.exports = User;