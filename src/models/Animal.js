const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'Name should be at least 2 characters long!'],

    },
    years: {
        type: Number,
        required: true,
        min:[1, 'Years should be number between 1-100'],
        max:[100, 'Years should be number between 1-100'],
    },
    kind: {
        type: String,
        required: true,
        minLength: [3, 'Kind should be at least 2 characters long!'],
    },
    image: {
        type: String,
        required: true,
        match:[/^https?:\/\//, "Invalid URL!"],
    },
    need: {
        type: String,
        required: true,
        minLength:[3, 'Need should be number between 3-20'],
        maxLength:[20, 'Need should be number between 3-20'],
    },
    location: {
        type: String,
        required: true,
        minLength:[5, 'Location should be at least 5 and no longer than 15 characters!'],
        maxLength:[15, 'Location should be at least 5 and no longer than 15 characters!'],
    },
    description: {
        type: String,
        required: true,
        minLength:[5, 'Description should be at least 5 and no longer than 50 characters!'],
        maxLength:[50, 'Description should be at least 5 and no longer than 50 characters!'],
    },
    donations: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }


});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;