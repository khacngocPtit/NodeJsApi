const Users = require("../Model/User")
const Decks = require('../Model/Decks')


const index = async(req, res, next) => {
    const users = await Users.find();
    return res.status(200).json({ users })

}
const newUser = (req, res, next) => {
    const newUser = new Users(req.body);
    newUser.save((err, user) => {
        if (err) {
            next(err);
        } else {
            return res.json({ message: "Success!" })
        }
    })
}
const getUser = async(req, res, next) => {

    const { uid } = req.value.param;
    const user = await Users.findById(uid);
    return res.json({ user })
}
const updateUser = async(req, res, next) => {
    const { uid } = req.value.param;
    const newUser = req.value.body;
    const user = await Users.findOneAndUpdate(uid, newUser);
    console.log("User Update:", user);
    return res.status(200).json({ message: "Success!" });

}
const replaceUser = async(req, res, next) => {
    const { uid } = req.value.param;
    const newUser = req.value.body;
    await Users.findOneAndUpdate(uid, newUser);
    return res.status(200).json({ message: "Succcess" });
}
const deleteUser = async(req, res, next) => {
    const { uid } = req.value.param;
    const user = await Users.findByIdAndRemove(uid);
    return res.status(200).json({ message: "Success!" });
}

const getDecks = async(req, res, next) => {
    const { uid } = req.param.value;
    const user = await Users.findById(uid).populate('decks');

    return res.status(200).json({ decks: user.decks })
}
const createDeck = async(req, res, next) => {
    const { uid } = req.value.param;
    const newDeck = new Decks(req.value.body);
    const user = await Users.findById(uid);
    newDeck.owner = user;
    await newDeck.save();
    user.decks.push(newDeck._id);
    await user.save();
    return res.status(200).json({ user })

}

module.exports = {
    index,
    newUser,
    getUser,
    updateUser,
    replaceUser,
    deleteUser,
    getDecks,
    createDeck

}