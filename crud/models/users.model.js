var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence')(mongoose);

var userSchema = new Schema({
    userID: { type: Number, unique: true },
    unique_id: Number,
    name: String,
    role: String,
    email: String,
    username: String,
    cnic: String,
    city: String,
    blockchainAddress: { type: String, require: true }
}, { timestamps: true });

userSchema.plugin(AutoIncrement, { inc_field: 'userID' });
var User = mongoose.model('User', userSchema);

module.exports = User;