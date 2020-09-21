const express = require('express');
const deckController = require('../Controllers/deck');
const { validateParams, validatorBody, schemas } = require('../helper/routerHelper')
const router = express.Router();

router.route('/')
    .get(deckController.index)
    .post(validatorBody(schemas.deckSchema), deckController.createNewDeck)
router.route('/:deckId')
    .get(validateParams(schemas.idSchema, 'deckId'), deckController.getDeck)
    .patch(validateParams(schemas.idSchema, 'deckId'), validatorBody(schemas.deckSchema), deckController.updateDeck)
    .put(validateParams(schemas.idSchema, 'deckId'), validatorBody(schemas.deckOptionalSchema), deckController.replaceDeck)
    .delete(validateParams(schemas.idSchema, 'deckId'), deckController.deleteDeck)
module.exports = router