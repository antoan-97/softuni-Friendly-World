const router = require('express').Router();
const animalManager = require('../managers/animalManager');
const { getErrorMessage } = require('../utils/errorHelper')


router.get('/create', async (req, res) => {
    try {
        res.render('create');
    } catch (err) {
        res.render('404')
    }

});


router.post('/create', async (req, res) => {
    const animalData = {
        ...req.body,
        owner: req.user._id,
    }

    try {
        await animalManager.create(animalData);
        res.redirect('/')
    } catch (err) {
        res.render('404', { error: getErrorMessage(err) })
    }
});


module.exports = router;