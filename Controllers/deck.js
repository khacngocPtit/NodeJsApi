const Deck = require('../Model/Decks');
const { findByIdAndUpdate } = require('../Model/Decks');
const Decks = require('../Model/Decks')
const Users = require('../Model/User')

const index = async(req, res, next) => {
    const decks = await Decks.find();
    return res.status(200).json({ decks: decks })
}
const createNewDeck = async(req, res, next) => {
    const deck = req.body;
    const owner = await Users.findById(req.body.owner);
    delete deck.owner;
    deck.owner = owner._id;
    const newDeck = new Decks(deck);
    newDeck.save();
    owner.decks.push(newDeck._id);
    owner.save();
    return res.status(200).json({ message: "Success!" });
}
const getDeck = async(req, res, next) => {
    const { deckId } = req.value.param;
    const deck = await Decks.findById(deckId);
    return res.status(200).json({ deck })
}

const updateDeck = async(req, res, next) => {
    const { deckId } = req.value.param;
    const newDeck = req.value.body;
    await Decks.findByIdAndUpdate(deckId, newDeck);
    return res.status(200).json({ message: "Success!" });
}

const replaceDeck = async(req, res, next) => {
    const { deckId } = req.value.param;
    const newDeck = req.value.body;
    await Decks.findByIdAndUpdate(deckId, newDeck);
    return res.status(200).json({ message: "Success!" });
}

const deleteDeck = async(req, res, next) => {
    const { deckId } = req.value.param;
    const deck = await Decks.findByIdAndDelete(deckId);
    const user = await Users.findById(deck.owner);
    user.decks.splice(user.decks.indexOf(deckId), 1);
    user.save();
    return res.status(200).json({ message: "Success!" });
}
module.exports = {
    index,
    createNewDeck,
    getDeck,
    updateDeck,
    replaceDeck,
    deleteDeck
}