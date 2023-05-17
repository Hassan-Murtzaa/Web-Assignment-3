const moongose = require('mongoose');
const Schema = moongose.Schema;

const userProfile = new Schema({
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

const userprofilepage = moongose.model('userprofilepage', userProfile);

module.exports = userprofilepage;

