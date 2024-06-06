const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const animalController = require('./controllers/animalController');



router.use(homeController);
router.use('/users',userController);
router.use('/animals', animalController);


module.exports = router