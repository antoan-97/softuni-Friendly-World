const router = require('express').Router();
const Animal = require('../models/Animal');

router.get('/', async (req,res) =>{
    const animals = await Animal.find().sort({ _id: -1 }).limit(3);
    res.render('home', { animals })
});

router.get('/404', (req,res) =>{
    res.render('404')
});

module.exports = router;