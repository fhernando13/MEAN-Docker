const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    age: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true}
},{
    timestamps: true,
    versionKey: false
}
);

module.exports = model('User', userSchema);