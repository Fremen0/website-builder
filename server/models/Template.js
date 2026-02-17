const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    components: {
        type: Array, // To store the array of component objects
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Template', TemplateSchema);