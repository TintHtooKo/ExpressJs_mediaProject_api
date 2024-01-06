const router = require('express').Router();
const controller = require('../controllers/post');
const { validateToken, validateBody, validateParams } = require('../utils/validator');
const { Schema } = require('../utils/schema');
const{ saveFile } = require('../utils/gallery');

router.get("/",controller.all);

router.post("/",validateToken,saveFile ,validateBody(Schema.PostSchema),controller.post);

router.get('/bycat/:id',controller.byCartId);
router.get('/byuser/:id',controller.byUser);
router.get('/bytag/:id',controller.byTag);
router.get('/paginate/:page',validateParams(Schema.AllSchema.page,"page"),controller.paginate);
router.get('/like/toggle/:id/:page',validateParams(Schema.AllSchema.id,"id"),controller.toggleLike);



router.route("/:id")
    .get(controller.get)

    .patch(validateToken,controller.patch)

    .delete(validateToken,controller.drop)

    
module.exports = router