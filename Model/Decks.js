const mongoose = require('mongoose');

const { Schema } = mongoose;

const deckSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    totals: {
        type: Number,
        default: 0
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})

const Deck = mongoose.model("Deck", deckSchema);
module.exports = Deck