import pkg from 'mongoose';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import gravatar from 'gravatar';

const { Schema, model } = pkg;

const userSchema = new Schema({
    name: {
        type: String,
        default: 'Guest',
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate(value) {
            const re = /\S+@\S+\.\S+/;
            return re.test(String(value).trim().toLowerCase());
        }
    },
    balance: {
        type: Number,
        default: null,
        },
    token: {
        type: String,
        default: null,
        },
    avatarURL: {
        type: String,
        default: function () {
            return gravatar.url(this.email, { s: '32' }, true);
        }
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verifyToken: {
        type: String,
        default: randomUUID(),
    },

}, {
        versionKey: false,
        timestamps: true,
        toJSON: {
        virtuals: true, transform: function (doc, ret) {
            delete ret._id;
            return ret;
        }},
        toObject: {virtuals: true},
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(6);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next()
});

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema);

export default User;