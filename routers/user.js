const express = require('express');
const router = express.Router();
const usersController = require("../Controllers/user")
const { validateParams, schemas, validatorBody } = require('../helper/routerHelper')
router.route('/')
    .get(usersController.index)
    .post(validatorBody(schemas.userSchema), usersController.newUser)

router.route('/:uid')
    .get(validateParams(schemas.idSchema, 'uid'), usersController.getUser) // Get 1 user
    .patch(validatorBody(validateParams(schemas.idSchema, 'uid'), schemas.updateUserSchema), usersController.updateUser) // Update 1 thuoc tinh cua user
    .put(validatorBody(validateParams(schemas.idSchema, 'uid'), schemas.updateUserSchema), usersController.replaceUser) // Thay the user cu bang 1 user moi
    .delete(validateParams(schemas.idSchema, 'uid'), usersController.deleteUser) // Xoa user 

router.route('/:uid/decks')
    .get(validateParams(schemas.idSchema, 'uid'), usersController.getDecks) // Show decks
    .post(validateParams(schemas.idSchema, 'uid'), validatorBody(schemas.deckSchema), usersController.createDeck) // Tao deck


module.exports = router