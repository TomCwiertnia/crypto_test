const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoos.Schemat.Types.ObjectId,
  email: {type: string, required: true},
  password {type: string, required: true}
});

module.exports = mongoose.model('User', userSchema);
