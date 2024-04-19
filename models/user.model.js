const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: 'name is required',
    },
    email: {
        type: String,
        required: 'email is required',
        unique: true,
        minLength: 5,
        lowercase: true, // Convierte el correo electrónico a minúsculas antes de guardarlo
        match: [/^\S+@\S+\.\S+$/, 'El formato del correo electrónico es inválido'] // Validación del formato del correo electrónico
    },
    password: {
        type: String,
        required: 'A valid password is required',
    },
    bio: {
        type: String,
        maxlength: 200
    }, 
    active: {
        type: Boolean,
        default: false 
    },
    accessToken: {
        type: String,
        required: true,
    }
}, {
    timestamps: true, // por defecto created_at y updated_at
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password; 
            delete ret.accessToken;

            return ret
        }
    },
});

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 10).then((hash) => {
        this.password = hash;
        next();
        });
    } else {
        next();
    }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password);
};


const User = mongoose.model('User', userSchema);
module.exports = User;