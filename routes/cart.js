const router = require('express').Router();
const controller = require('../controllers/cart');
const {saveFile} = require('../utils/gallery');
const {Schema} = require('../utils/schema');
const {validateBody, validateParams, validateToken} = require('../utils/validator');


router.get('/',controller.all);
router.post('/',[validateToken,saveFile,validateBody(Schema.AddCart),controller.add]);

router.route('/:id')
    .get(validateToken,validateParams(Schema.AllSchema.id,"id"),controller.get)
    // .patch(validateParams(Schema.AllSchema.id,"id"),controller.patch)
    .patch(validateToken,saveFile,controller.patch)

    .delete(validateToken,validateParams(Schema.AllSchema.id,"id"),controller.drop)


module.exports = router