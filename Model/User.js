const mongoose = require('mongoose');

const { Schema } = mongoose;

const bcrypt = require('bcryptjs');
const UserSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ten email la duy nhat
        lowercase: true // TH nhap chu hoa
    },
    password: {
        type: String,
        required: true
    },
    decks: [{
        type: mongoose.Types.ObjectId,
        ref: 'Deck'
    }]

})

UserSchema.pre('save', async function(next) {
    try {
        console.log("Password: ", this.password);
        const salt = await bcrypt.genSalt();
        const passwordHashed = await bcrypt.hash(this.password, salt);
        this.password = passwordHashed;
        next();
    } catch (error) {
        next(error);
    }
})

UserSchema.methods.isValidPassword = async function(newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (err) {
        throw new Error(err);
    }
}
const Users = mongoose.model("User", UserSchema, "users_colecttion");
module.exports = Users