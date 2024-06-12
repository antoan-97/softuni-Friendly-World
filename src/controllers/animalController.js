const router = require('express').Router();
const animalManager = require('../managers/animalManager');

const { getErrorMessage } = require('../utils/errorHelper')
const { isAuth, isOwner } = require('../middlewares/authMiddleware');


router.get('/', async (req, res) => {
    const animals = await animalManager.getAll().lean();
    res.render('animals', { animals })
});

router.get('/create', isAuth, async (req, res) => {
    try {
        res.render('animals/create');
    } catch (err) {
        res.render('404')
    }

});


router.post('/create', isAuth, async (req, res) => {
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


router.get('/:animalId/details', async (req, res) => {
    const { user } = req;
    const animalId = req.params.animalId;

    const animal = await animalManager.getOne(animalId).lean();
    const isOwner = req.user?._id == animal.owner?._id
    const hasDonated = animal.donations?.some((v) => v?.toString() === user?._id);

    try {
        res.render('animals/details', { animal, user, isOwner, hasDonated, });
    } catch (err) {
        res.render('404', { error: getErrorMessage(err) })
    }
});

router.get('/:animalId/donate', isAuth, async (req, res) => {
    const animalId = req.params.animalId;
    const userId = req.user._id;

    try {
        await animalManager.donate(animalId, userId);
        res.redirect(`/animals/${animalId}/details`)
    } catch (err) {
        res.render('404', { error: getErrorMessage(err) })
    }
});


router.get('/:animalId/edit', isAuth,isOwner, async (req, res) => {
    const animalId = req.params.animalId;

    try {
        const animal = await animalManager.getOne(animalId).lean();
        res.render('animals/edit', { animal })
    } catch (err) {
        res.render('404', { error: getErrorMessage(err) })
    }
});

router.post('/:animalId/edit', isAuth, isOwner, async (req, res) => {
    const animalId = req.params.animalId;
    const animalData = req.body;

    try {
        await animalManager.edit(animalId, animalData);
        res.redirect(`/animals/${animalId}/details`);
    } catch (err) {
        res.render('animals/edit', { animal: { ...animalData, _id: animalId }, error: getErrorMessage(err) });
    }
});

router.get('/:animalId/delete', isOwner, isAuth, async (req, res) => {
    const animalId = req.params.animalId;

    try {
        await animalManager.delete(animalId);
        res.redirect('/animals')
    } catch (err) {
        res.render('404', { error: getErrorMessage(err) })
    }
});


router.get('/search', async (req, res) => {
    const { name } = req.query;

    let query = {};
    if (name) {
        query.name = new RegExp(`^${name}$`, 'i'); // Case-insensitive full match
    }

    try {
        const results = await animalManager.search(query);
        res.render('partials/search', { results }); // Render the 'search.hbs' template
    } catch (err) {
        res.render('404', { error: getErrorMessage(err) });
    }
});


module.exports = router;