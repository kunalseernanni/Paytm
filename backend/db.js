const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        maxlength: 30,
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
        maxlength: 50,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})
const User = mongoose.model('User', userSchemma);
const Account = mongoose.model('Account', accountSchema)
module.exports ={
    User, 
    Account
}
