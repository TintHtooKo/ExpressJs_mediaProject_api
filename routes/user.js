const router = require('express').Router();
const controller = require('../controllers/user');
const { Schema } = require('../utils/schema');
const { validateBody } = require('../utils/validator')


router.post('/',controller.login);
router.post('/register',validateBody(Schema.RegisterSchema),controller.register);


module.exports = router; 