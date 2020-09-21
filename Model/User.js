const mongoose = require('mongoose');

const { Schema } = mongoose;
const UserSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    decks: [{
        type: mongoose.Types.ObjectId,
        ref: 'Deck'
    }]

})
const Users = mongoose.model("User", UserSchema, "users_colecttion");
module.exports = Users