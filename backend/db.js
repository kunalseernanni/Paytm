const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        maxlength: 20,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    fisrtName: {
        type: String,
        required: true,
        maxlength: 6,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 6,
        trim: true
    }
});

const User = mongoose.model('User', userSchemma);
module.exports ={
    User
}
