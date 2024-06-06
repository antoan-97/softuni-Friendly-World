const Animal = require('../models/Animal');

exports.create = (animalData) => Animal.create(animalData);

exports.getAll = () => Animal.find().populate('owner');

exports.getOne = (animalId) => Animal.findById(animalId).populate('owner');

exports.donate = async (animalId, userId) => {
    const animal = await Animal.findById(animalId);

    if (!animal) {
        throw new Error('Animal not found');
    }

    // Check if the user has already donated
    if (animal.donations.includes(userId)) {
        return;
    }

    animal.donations.push(userId);
    return animal.save();
};

