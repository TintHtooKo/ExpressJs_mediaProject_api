const router = require('express').Router();
const controller = require('../controllers/comment');
const { Schema } = require('../utils/schema');
const { validateBody, validateToken, validateParams } = require('../utils/validator');

router.get('/:id',validateToken,validateParams(Schema.AllSchema.id,"id"),controller.all);
router.post('/',validateToken,validateBody(Schema.CommentSchema),controller.add);
router.delete('/:id',validateToken,validateParams(Schema.AllSchema.id,"id"),controller.drop);

module.exports = router;